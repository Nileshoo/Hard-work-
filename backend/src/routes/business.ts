import { Router } from "express";
import { z } from "zod";
import { query } from "../db/index.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

export const businessRouter = Router();

businessRouter.use(requireAuth);

businessRouter.get("/me", async (req: AuthedRequest, res) => {
  const result = await query("SELECT id, name, domain, plan FROM businesses WHERE id=$1", [req.auth?.businessId]);
  res.json(result.rows[0]);
});

const settingsSchema = z.object({
  tone: z.string().min(2),
  greeting: z.string().min(2),
  escalationRules: z.record(z.unknown()),
  businessHours: z.record(z.unknown())
});

businessRouter.put("/settings", async (req: AuthedRequest, res) => {
  const parsed = settingsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid settings" });
    return;
  }

  const { tone, greeting, escalationRules, businessHours } = parsed.data;
  await query(
    `INSERT INTO chatbot_settings (business_id, tone, greeting, escalation_rules, business_hours)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (business_id) DO UPDATE SET
       tone = EXCLUDED.tone,
       greeting = EXCLUDED.greeting,
       escalation_rules = EXCLUDED.escalation_rules,
       business_hours = EXCLUDED.business_hours,
       updated_at = NOW()` ,
    [req.auth?.businessId, tone, greeting, escalationRules, businessHours]
  );

  res.json({ status: "updated" });
});
