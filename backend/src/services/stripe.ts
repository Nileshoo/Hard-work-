import Stripe from "stripe";
import { env } from "../config/env.js";

export const stripe = env.stripeSecretKey
  ? new Stripe(env.stripeSecretKey, { apiVersion: "2024-06-20" })
  : null;
