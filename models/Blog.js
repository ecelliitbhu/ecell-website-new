import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    blogName: {
      type: String,
      required: true,
    },
    blogSubheading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collections: "allBlogs" }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogsSchema);
