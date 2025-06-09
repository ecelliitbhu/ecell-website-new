import mongoose from "mongoose";

const HelpSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collections: "help" }
);

export default mongoose.models.help || mongoose.model("help", HelpSchema);
