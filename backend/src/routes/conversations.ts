import { Router } from "express";
import { query } from "../db/index.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const conversationRouter = Router();

conversationRouter.use(requireAuth);

conversationRouter.get("/", async (req: AuthedRequest, res) => {
  const result = await query(
    "SELECT id, visitor_email, status, created_at FROM conversations WHERE business_id=$1 ORDER BY created_at DESC LIMIT 50",
    [req.auth?.businessId]
  );
  res.json({ conversations: result.rows });
});

conversationRouter.get("/:id/messages", async (req: AuthedRequest, res) => {
  const result = await query(
    "SELECT sender, content, created_at FROM messages WHERE conversation_id=$1 ORDER BY created_at ASC",
    [req.params.id]
  );
  res.json({ messages: result.rows });
});

conversationRouter.get("/analytics/summary", async (req: AuthedRequest, res) => {
  const total = await query(
    "SELECT COUNT(*)::int AS total FROM conversations WHERE business_id=$1",
    [req.auth?.businessId]
  );
  const resolved = await query(
    "SELECT COUNT(*)::int AS total FROM conversations WHERE business_id=$1 AND status='resolved'",
    [req.auth?.businessId]
  );
  const escalated = await query(
    "SELECT COUNT(*)::int AS total FROM conversations WHERE business_id=$1 AND status='needs_attention'",
    [req.auth?.businessId]
  );
  res.json({
    totalChats: total.rows[0].total,
    resolvedByAi: resolved.rows[0].total,
    escalated: escalated.rows[0].total
  });
});
