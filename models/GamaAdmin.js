import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const User = require('./user');

const gamaAdminSchema = new mongoose.Schema(
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
    postByGamaAdmin: [
      {
        type: Schema.Types.ObjectId,
        ref: "NormalAdmin",
        default: [],
      },
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
        ref: "Student",
        default: [],
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Startup",
        default: [],
      },
    ],
  },
  { collections: "allGamaAdmins" }
);

export default mongoose.models.GamaAdmin ||
  mongoose.model("GamaAdmin", gamaAdminSchema);
