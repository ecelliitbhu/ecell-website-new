import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const User = require('./user');
const superAdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collections: "allSuperAdmins" }
);

export default mongoose.models.SuperAdmin ||
  mongoose.model("SuperAdmin", superAdminSchema);
