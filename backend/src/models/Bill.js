import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: "pcs" },
  },
  { _id: false }
);

const billSchema = new mongoose.Schema(
  {
    displayId: { type: String, index: true },
    customerName: { type: String, default: "Walk-in customer", trim: true },
    customerPhone: { type: String, default: "", trim: true },
    items: { type: [billItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

billSchema.index({ createdAt: -1 });

export const Bill = mongoose.model("Bill", billSchema);
