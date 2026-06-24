import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  lessons: {
    type: [LessonSchema],
    defualt: [],
  },
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxLength: 300,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: null,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    chapters: {
      type: [ChapterSchema],
      default: [],
    },
    totalDuration: {
      type: String,
      default: "",
    },
    lessonsCount: {
      type: Number,
      default: 0,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "coming-soon"],
      default: "draft",
    },
    level: {
      type: String,
      enum: ["beginner", "intermidate", "advanced"],
      default: "beginner",
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    studentsCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
