import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    isAccept: {
      type: Boolean,
      default: false,
    },

    answer: {
      body: {
        type: String,
        default: "",
      },

      createdAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
