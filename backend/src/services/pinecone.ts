import { env } from "../config/env.js";

export interface PineconeMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export const upsertEmbedding = async (namespace: string, id: string, values: number[], metadata: Record<string, unknown>) => {
  const response = await fetch(`https://${env.pineconeIndex}.svc.pinecone.io/vectors/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": env.pineconeApiKey
    },
    body: JSON.stringify({
      namespace,
      vectors: [{ id, values, metadata }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinecone upsert error: ${errorText}`);
  }
};

export const queryEmbeddings = async (namespace: string, vector: number[], topK = 5) => {
  const response = await fetch(`https://${env.pineconeIndex}.svc.pinecone.io/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": env.pineconeApiKey
    },
    body: JSON.stringify({
      namespace,
      vector,
      topK,
      includeMetadata: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinecone query error: ${errorText}`);
  }

  const data = await response.json();
  return (data.matches ?? []) as PineconeMatch[];
};
