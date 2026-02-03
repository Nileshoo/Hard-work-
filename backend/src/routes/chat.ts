import { Router } from "express";
import { z } from "zod";
import { query } from "../db/index.js";
import { runRagPipeline } from "../services/rag.js";

export const chatRouter = Router();

const chatSchema = z.object({
  businessId: z.string().uuid(),
  conversationId: z.string().uuid().optional(),
  message: z.string().min(1),
  visitorEmail: z.string().email().optional()
});

chatRouter.post("/message", async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { businessId, conversationId, message, visitorEmail } = parsed.data;
  let conversation = conversationId;
  if (!conversation) {
    const result = await query(
      "INSERT INTO conversations (business_id, visitor_email) VALUES ($1, $2) RETURNING id",
      [businessId, visitorEmail ?? null]
    );
    conversation = result.rows[0].id as string;
  }

  await query(
    "INSERT INTO messages (conversation_id, sender, content) VALUES ($1, 'visitor', $2)",
    [conversation, message]
  );

  const historyResult = await query(
    "SELECT sender, content FROM messages WHERE conversation_id=$1 ORDER BY created_at ASC LIMIT 10",
    [conversation]
  );
  const history = historyResult.rows.map((row) => `${row.sender}: ${row.content}`);

  const ragResult = await runRagPipeline({
    businessId,
    question: message,
    conversationHistory: history
  });

  await query(
    "INSERT INTO messages (conversation_id, sender, content, confidence) VALUES ($1, 'assistant', $2, $3)",
    [conversation, ragResult.answer, ragResult.confidence]
  );

  if (ragResult.confidence < 0.5) {
    await query("UPDATE conversations SET status='needs_attention', updated_at=NOW() WHERE id=$1", [conversation]);
  } else {
    await query("UPDATE conversations SET status='resolved', updated_at=NOW() WHERE id=$1", [conversation]);
  }

  res.json({
    conversationId: conversation,
    answer: ragResult.answer,
    confidence: ragResult.confidence,
    citations: ragResult.citations
  });
});
