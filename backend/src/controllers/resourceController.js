import { z } from "zod";
import { Resource } from "../models/Resource.js";

const createSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
  status: z.enum(["active", "archived"]).optional(),
  tags: z.array(z.string().min(1).max(50)).max(50).optional(),
  payload: z.record(z.any()).optional(),
});

const updateSchema = createSchema.partial();

function getOwnerId(req) {
  const sub = req.user?.sub;
  if (!sub) {
    const err = new Error("Missing auth subject");
    err.statusCode = 401;
    throw err;
  }
  return sub;
}

export async function createResource(req, res) {
  const ownerId = getOwnerId(req);
  const body = createSchema.parse(req.body);
  const doc = await Resource.create({ ownerId, ...body });
  res.status(201).json({ resource: doc });
}

export async function listResources(req, res) {
  const ownerId = getOwnerId(req);
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Resource.find({ ownerId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Resource.countDocuments({ ownerId }),
  ]);

  res.json({
    resources: items,
    page,
    limit,
    total,
  });
}

export async function getResource(req, res) {
  const ownerId = getOwnerId(req);
  const doc = await Resource.findOne({ _id: req.params.id, ownerId });
  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Resource not found" } });
  }
  res.json({ resource: doc });
}

export async function updateResource(req, res) {
  const ownerId = getOwnerId(req);
  const patch = updateSchema.parse(req.body);

  const doc = await Resource.findOneAndUpdate(
    { _id: req.params.id, ownerId },
    { $set: patch },
    { new: true, runValidators: true }
  );

  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Resource not found" } });
  }

  res.json({ resource: doc });
}

export async function deleteResource(req, res) {
  const ownerId = getOwnerId(req);
  const doc = await Resource.findOneAndDelete({ _id: req.params.id, ownerId });
  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Resource not found" } });
  }
  res.status(204).send();
}

