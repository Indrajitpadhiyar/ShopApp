import mongoose from "mongoose";
import { z } from "zod";
import { Bill } from "../models/Bill.js";
import { Product } from "../models/Product.js";

const itemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
  unit: z.string().optional(),
});

const createSchema = z.object({
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  items: z.array(itemSchema).min(1),
});

export async function createBill(req, res) {
  const body = createSchema.parse(req.body);
  const total = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  for (const item of body.items) {
    if (!item.productId.startsWith("custom") && mongoose.Types.ObjectId.isValid(item.productId)) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      }
    }
  }

  const displayId = `BILL-${Date.now().toString().slice(-6)}`;
  const doc = await Bill.create({
    displayId,
    customerName: body.customerName?.trim() || "Walk-in customer",
    customerPhone: body.customerPhone?.trim() || "",
    items: body.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      unit: i.unit ?? "pcs",
    })),
    total,
  });

  res.status(201).json({ bill: doc });
}

export async function listBills(req, res) {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 100);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Bill.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Bill.countDocuments({}),
  ]);

  res.json({ bills: items, page, limit, total });
}

export async function getBill(req, res) {
  const doc = await Bill.findById(req.params.id).lean();
  if (!doc) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: "Bill not found" } });
  }
  res.json({ bill: doc });
}
