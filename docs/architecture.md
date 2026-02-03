# SupportAI System Architecture

## High-level overview
- **Frontend (Next.js App Router)**: Admin dashboard, auth screens, and configuration pages.
- **Backend (Express API)**: Handles authentication, knowledge ingestion, RAG chat, billing, and analytics.
- **PostgreSQL**: Stores tenants, users, knowledge sources, and conversation history.
- **Pinecone**: Stores embeddings for fast vector retrieval.
- **OpenAI API**: Generates embeddings and chat responses.
- **Stripe**: Manages subscriptions and plan limits.

## Data flow
1. Admin uploads knowledge (website, PDF, FAQ).
2. Backend extracts text, chunks it, creates embeddings via OpenAI, and upserts into Pinecone.
3. User asks a question through the widget.
4. Backend embeds the question, queries Pinecone for relevant chunks, builds a prompt, and requests OpenAI completion.
5. Conversation and message data are stored in PostgreSQL, including confidence scores and escalation status.

## Multi-tenant isolation
- Every table includes `business_id` for row-level isolation.
- Pinecone namespace equals the business ID.
- JWTs embed `businessId` and `role` to enforce access control.
