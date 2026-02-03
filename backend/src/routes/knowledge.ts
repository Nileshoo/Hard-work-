import fs from "fs";
import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { crawlWebsite } from "../services/crawler.js";
import { extractPdfText } from "../services/pdf.js";
import { chunkText } from "../services/embeddings.js";
import { createEmbedding } from "../services/openai.js";
import { upsertEmbedding } from "../services/pinecone.js";
import { query } from "../db/index.js";

fs.mkdirSync("uploads", { recursive: true });

export const knowledgeRouter = Router();
const upload = multer({ dest: "uploads/" });

knowledgeRouter.use(requireAuth);

const websiteSchema = z.object({ url: z.string().url(), label: z.string().min(2) });
const faqSchema = z.object({ question: z.string().min(2), answer: z.string().min(2), label: z.string().min(2) });

knowledgeRouter.post("/website", async (req: AuthedRequest, res) => {
  const parsed = websiteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { url, label } = parsed.data;
  const sourceResult = await query(
    "INSERT INTO knowledge_sources (business_id, source_type, source_label, source_uri, status) VALUES ($1, 'website', $2, $3, 'processing') RETURNING id",
    [req.auth?.businessId, label, url]
  );
  const sourceId = sourceResult.rows[0].id as string;

  const text = await crawlWebsite(url);
  const chunks = chunkText(text);

  await Promise.all(
    chunks.map(async (chunk, index) => {
      const embedding = await createEmbedding(chunk);
      const embeddingId = `${sourceId}-${index}`;
      await upsertEmbedding(req.auth?.businessId ?? "", embeddingId, embedding, { text: chunk });
      await query(
        "INSERT INTO knowledge_chunks (business_id, source_id, content, embedding_id, metadata) VALUES ($1, $2, $3, $4, $5)",
        [req.auth?.businessId, sourceId, chunk, embeddingId, { source: "website", url }]
      );
    })
  );

  await query("UPDATE knowledge_sources SET status='ready' WHERE id=$1", [sourceId]);
  res.json({ status: "ready", sourceId });
});

knowledgeRouter.post("/faq", async (req: AuthedRequest, res) => {
  const parsed = faqSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { question, answer, label } = parsed.data;
  const content = `Q: ${question}\nA: ${answer}`;
  const sourceResult = await query(
    "INSERT INTO knowledge_sources (business_id, source_type, source_label, status) VALUES ($1, 'faq', $2, 'ready') RETURNING id",
    [req.auth?.businessId, label]
  );
  const sourceId = sourceResult.rows[0].id as string;
  const embedding = await createEmbedding(content);
  const embeddingId = `${sourceId}-faq`;
  await upsertEmbedding(req.auth?.businessId ?? "", embeddingId, embedding, { text: content });
  await query(
    "INSERT INTO knowledge_chunks (business_id, source_id, content, embedding_id, metadata) VALUES ($1, $2, $3, $4, $5)",
    [req.auth?.businessId, sourceId, content, embeddingId, { source: "faq" }]
  );

  res.json({ status: "ready", sourceId });
});

knowledgeRouter.post("/pdf", upload.single("file"), async (req: AuthedRequest, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Missing file" });
    return;
  }
  const label = req.body.label || req.file.originalname;
  const sourceResult = await query(
    "INSERT INTO knowledge_sources (business_id, source_type, source_label, source_uri, status) VALUES ($1, 'pdf', $2, $3, 'processing') RETURNING id",
    [req.auth?.businessId, label, req.file.path]
  );
  const sourceId = sourceResult.rows[0].id as string;
  const text = await extractPdfText(req.file.path);
  const chunks = chunkText(text);

  await Promise.all(
    chunks.map(async (chunk, index) => {
      const embedding = await createEmbedding(chunk);
      const embeddingId = `${sourceId}-${index}`;
      await upsertEmbedding(req.auth?.businessId ?? "", embeddingId, embedding, { text: chunk });
      await query(
        "INSERT INTO knowledge_chunks (business_id, source_id, content, embedding_id, metadata) VALUES ($1, $2, $3, $4, $5)",
        [req.auth?.businessId, sourceId, chunk, embeddingId, { source: "pdf" }]
      );
    })
  );

  await query("UPDATE knowledge_sources SET status='ready' WHERE id=$1", [sourceId]);
  res.json({ status: "ready", sourceId });
});
