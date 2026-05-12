import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    tags: { type: [String], default: [] },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

resourceSchema.index({ ownerId: 1, createdAt: -1 });

export const Resource = mongoose.model("Resource", resourceSchema);

