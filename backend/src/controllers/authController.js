import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

const loginSchema = registerSchema;

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error("Missing JWT_SECRET");
    err.statusCode = 500;
    throw err;
  }

  return jwt.sign({ sub: user._id.toString(), email: user.email }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export async function register(req, res) {
  const { email, password } = registerSchema.parse(req.body);

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: { code: "EMAIL_TAKEN", message: "Email already registered" } });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash });
  const token = signToken(user);

  res.status(201).json({
    user: { id: user._id, email: user.email },
    token,
  });
}

export async function login(req, res) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" } });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" } });
  }

  const token = signToken(user);
  res.json({ user: { id: user._id, email: user.email }, token });
}

