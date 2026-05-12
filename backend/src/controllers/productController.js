import mongoose from "mongoose";
import { z } from "zod";
import { Product } from "../models/Product.js";

const createSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().max(120).optional(),
  unit: z.string().max(16).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().nonnegative(),
  currency: z.string().min(3).max(3).optional(),
  images: z.array(z.string().url()).max(20).optional(),
  tags: z.array(z.string().min(1).max(50)).max(50).optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
});

const updateSchema = createSchema.partial();

export async function createProduct(req, res) {
  const body = createSchema.parse(req.body);
  const doc = await Product.create(body);
  res.status(201).json({ product: doc });
}

export async function listProducts(req, res) {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
  const skip = (page - 1) * limit;
  const q = (req.query.q || "").toString().trim();

  const filter = {};
  if (q) {
    filter.$or = [{ name: { $regex: q, $options: "i" } }, { category: { $regex: q, $options: "i" } }];
  }

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({ products: items, page, limit, total });
}

export async function getProduct(req, res) {
  const doc = await Product.findById(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Product not found" } });
  }
  res.json({ product: doc });
}

export async function updateProduct(req, res) {
  const patch = updateSchema.parse(req.body);

  const doc = await Product.findByIdAndUpdate(req.params.id, { $set: patch }, { new: true, runValidators: true });

  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Product not found" } });
  }

  res.json({ product: doc });
}

export async function deleteProduct(req, res) {
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Product not found" } });
  }
  res.json({ ok: true, deletedId: doc._id.toString() });
}

const bulkDeleteSchema = z.object({
  ids: z.array(z.string()).min(1).max(200),
});

export async function deleteProductsBulk(req, res) {
  const { ids } = bulkDeleteSchema.parse(req.body);
  const objectIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
  if (objectIds.length === 0) {
    return res.status(400).json({ error: { code: "INVALID_IDS", message: "No valid product ids" } });
  }
  const result = await Product.deleteMany({ _id: { $in: objectIds } });
  res.json({ ok: true, deletedCount: result.deletedCount });
}

