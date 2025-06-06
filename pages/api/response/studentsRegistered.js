import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import Opportunity from "../../../models/Opportunity.js";
import Student from "../../../models/Student.js";
import Response from "../../../models/Response.js";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";

const router = nc();

router.get(
  "/api/response/studentsRegistered",
  [verifyLoggedin],
  async (req, res) => {
    await dbConnect();
    try {
      Opportunity.findOne({ _id: req.body.id })
        .populate("responses")
        .exec(function (err, opportunity) {
          res.send(opportunity);
        });
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
