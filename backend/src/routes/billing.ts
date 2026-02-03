import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { stripe } from "../services/stripe.js";
import { env } from "../config/env.js";

export const billingRouter = Router();

const checkoutSchema = z.object({
  priceId: z.string().min(2)
});

billingRouter.post("/checkout", requireAuth, async (req: AuthedRequest, res) => {
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  if (!stripe) {
    res.status(500).json({ error: "Stripe not configured" });
    return;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: parsed.data.priceId, quantity: 1 }],
    success_url: `${env.appUrl}/dashboard/billing?status=success`,
    cancel_url: `${env.appUrl}/dashboard/billing?status=cancel`
  });

  res.json({ url: session.url });
});
