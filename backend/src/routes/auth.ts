import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { query } from "../db/index.js";

export const authRouter = Router();

const signupSchema = z.object({
  businessName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const signToken = (payload: { userId: string; businessId: string; role: "admin" | "agent" }) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "12h" });
};

authRouter.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { businessName, email, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);

  const businessResult = await query(
    "INSERT INTO businesses (name) VALUES ($1) RETURNING id",
    [businessName]
  );
  const businessId = businessResult.rows[0].id as string;

  const userResult = await query(
    "INSERT INTO users (business_id, email, password_hash, role) VALUES ($1, $2, $3, 'admin') RETURNING id",
    [businessId, email, passwordHash]
  );

  const token = signToken({ userId: userResult.rows[0].id, businessId, role: "admin" });
  res.json({ token, businessId });
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const { email, password } = parsed.data;
  const result = await query("SELECT id, business_id, password_hash, role FROM users WHERE email=$1", [email]);
  const user = result.rows[0];
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signToken({
    userId: user.id,
    businessId: user.business_id,
    role: user.role
  });

  res.json({ token, businessId: user.business_id });
});
