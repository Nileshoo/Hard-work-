import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.js";
import { businessRouter } from "./routes/business.js";
import { chatRouter } from "./routes/chat.js";
import { knowledgeRouter } from "./routes/knowledge.js";
import { conversationRouter } from "./routes/conversations.js";
import { billingRouter } from "./routes/billing.js";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);
app.use("/api/knowledge", knowledgeRouter);
app.use("/api/chat", chatRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/billing", billingRouter);
