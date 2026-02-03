# SupportAI – AI Customer Support SaaS

Production-ready starter for an AI customer support platform built for SMBs.

## Tech stack
- **Frontend**: Next.js App Router + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Vector DB**: Pinecone
- **AI**: OpenAI API (chat + embeddings)
- **Payments**: Stripe

## Monorepo layout
```
backend/          Express API, RAG pipeline, Stripe integration
frontend/         Next.js dashboard and auth pages
widget/           Embeddable chat widget
docs/             Architecture notes
```

## Getting started

### 1) Backend
```bash
cd backend
cp ../.env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) Database
Apply the SQL schema in `backend/src/db/schema.sql` to your PostgreSQL instance.

```bash
psql $DATABASE_URL -f backend/src/db/schema.sql
```

## Key API endpoints
- `POST /api/auth/signup` – create business + admin user
- `POST /api/auth/login` – issue JWT
- `POST /api/knowledge/website` – crawl and ingest a website
- `POST /api/knowledge/pdf` – upload and ingest a PDF
- `POST /api/knowledge/faq` – add manual FAQs
- `POST /api/chat/message` – RAG pipeline for the widget
- `GET /api/conversations/analytics/summary` – dashboard analytics

## Environment variables
See `.env.example` for required secrets.

## Notes
- All data is scoped by `business_id` to enforce multi-tenancy.
- The widget is a standalone JS bundle located in `widget/widget.js`.
- Uploaded files land in `backend/uploads` (ensure the directory exists in deployments).
