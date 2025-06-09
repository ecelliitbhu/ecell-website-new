import mongoose from "mongoose";
const Schema = mongoose.Schema;

const responseSchema = new mongoose.Schema(
  {
    submission: {
      //uploaded file name
      originalFileName: {
        type: String,
        required: false,
      },
      uploadedFileName: {
        type: String,
        required: false,
      },
    },
    companyName: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: true,
    },
    Student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true },
  { collections: "allResponse" }
);

export default mongoose.models.Response ||
  mongoose.model("Response", responseSchema);
