import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    googleId: {
      //if from iit bhu
      type: String, //payload['sub']
      required: false,
    },
    Name: {
      type: String, //givenName
      required: true,
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
    landingPageLink: {
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
    currentState: {
      type: String,
      required: false,
    },
    founder: {
      type: String,
      required: false,
    },
    sector: {
      type: String,
      enum: ["HealthTech", "Fintech"],
    },
    description: {
      // Why How What
      type: String,
      required: true,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
  },
  { collections: "allStartups" }
);

export default mongoose.models.Startup ||
  mongoose.model("Startup", startupSchema);

// Startup Name
// Logo
// Description
// Website Link
// Founders: {personname:linkedinurl, person2:linkedinurl}
// Current Status: { Current : Graduate : Seed Support : Established Startups}
// Sector: { Healthtech/Fintech }
// Avatar
