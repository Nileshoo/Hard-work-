import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthPayload {
  userId: string;
  businessId: string;
  role: "admin" | "agent";
}

export interface AuthedRequest extends Request {
  auth?: AuthPayload;
}

export const requireAuth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    req.auth = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
