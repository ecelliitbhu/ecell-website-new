import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    internalStartDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    internalEndDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: false,
    },
  },
  { collections: "allBlogs" }
);

export default mongoose.models.Events || mongoose.model("Events", eventSchema);
