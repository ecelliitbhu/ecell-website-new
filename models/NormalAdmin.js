import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const User = require('./user');

const normalAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    postByNormalAdmin: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Schemes",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Startup",
        default: [],
      },
    ],
  },
  { collections: "allNormalAdmins" }
);

export default mongoose.models.NormalAdmin ||
  mongoose.model("NormalAdmin", normalAdminSchema);
