import { Request, Response, NextFunction } from "express";

const requestCounts: Record<string, { count: number; lastReset: number }> = {};

// límite de 30 peticiones en 5 minutos.
const WINDOW_MS = 5 * 60 * 1000; 
const MAX_REQUESTS = 30;

export function simpleRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || "unknown";
  const now = Date.now();

  if (!requestCounts[ip] || now - requestCounts[ip].lastReset > WINDOW_MS) {
    requestCounts[ip] = { count: 1, lastReset: now };
  } else {
    requestCounts[ip].count++;
  }

  if (requestCounts[ip].count > MAX_REQUESTS) {
    res.status(429).json({ message: "Too many requests. Please try again later." });
    return
  }

  next();
}