import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true , required: true },
    description: { type: String },
    coursesCount: { type: String },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
