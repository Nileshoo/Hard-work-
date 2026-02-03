import { createChatCompletion, createEmbedding } from "./openai.js";
import { queryEmbeddings } from "./pinecone.js";

const SYSTEM_PROMPT = `You are a helpful AI support assistant.\n- Answer using the provided knowledge snippets.\n- If you are unsure, ask a clarifying question.\n- Keep answers concise and actionable.`;

export interface RagResult {
  answer: string;
  confidence: number;
  citations: string[];
}

export const runRagPipeline = async ({
  businessId,
  question,
  conversationHistory
}: {
  businessId: string;
  question: string;
  conversationHistory: string[];
}): Promise<RagResult> => {
  const embedding = await createEmbedding(question);
  const matches = await queryEmbeddings(businessId, embedding, 5);
  const context = matches
    .map((match, index) => `Snippet ${index + 1}: ${match.metadata?.text ?? ""}`)
    .join("\n");

  const userPrompt = `Context:\n${context}\n\nConversation history:\n${conversationHistory.join("\n")}\n\nUser question: ${question}`;
  const answer = await createChatCompletion([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt }
  ]);

  const confidence = matches.length
    ? Math.min(0.9, Math.max(0.2, matches[0]?.score ?? 0.2))
    : 0.2;

  return {
    answer,
    confidence,
    citations: matches.map((match) => match.id)
  };
};
