import { env } from "../config/env.js";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const createChatCompletion = async (messages: ChatMessage[]) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openaiApiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI error: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
};

export const createEmbedding = async (input: string) => {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.openaiApiKey}`
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI embedding error: ${errorText}`);
  }

  const data = await response.json();
  return data.data?.[0]?.embedding ?? [];
};
