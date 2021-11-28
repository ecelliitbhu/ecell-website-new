import mongoose from "mongoose";
// const Opportunty=require('./Response');
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    googleId: {
      //if from iit bhu
      type: String, //payload['sub']
      required: false,
    },
    firstName: {
      type: String, //givenName
      required: true,
    },
    lastName: {
      type: String, //familyName
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      //if enters manually
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    Postbystudent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Opportunity",
        default: [],
      },
    ],
  },
  { collections: "allStudents" }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
