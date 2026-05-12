import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Optional: if you later add login, we can scope products per-user.
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, index: true },

    // Keep backend fields aligned with your current frontend UI (name/category/unit).
    name: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, default: "", trim: true, maxlength: 120 },
    unit: { type: String, default: "pcs", trim: true, maxlength: 16 },

    description: { type: String, default: "", maxlength: 5000 },

    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true, trim: true, minlength: 3, maxlength: 3 },

    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ ownerId: 1, createdAt: -1 });
productSchema.index({ ownerId: 1, name: 1 });

export const Product = mongoose.model("Product", productSchema);

