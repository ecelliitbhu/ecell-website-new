import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const Response=require('./Response');

const opportunitySchema = new mongoose.Schema(
  {
    responses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Response",
      },
    ],
    companyName: {
      type: String,
      required: true,
    },
    linkedinurl: {
      type: String,
      required: true,
    },
    websiteurl: {
      type: String,
    },
    opportunityDescription: {
      type: String,
      required: true,
    },
    perks: {
      type: String,
      required: true,
    },
    skillsRequired: [
      {
        type: String,
        required: true,
      },
    ],
    stipend: {
      type: Number,
      required: true,
    },
    duration: {
      // in weeks
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    numberOfAvailableSeats: {
      type: Number,
      required: true,
    },
  },
  { collections: "allOpportunities" }
);

export default mongoose.models.Opportunity ||
  mongoose.model("Opportunity", opportunitySchema);
