import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import Opportunity from "../../../models/Opportunity.js";
import Student from "../../../models/Student.js";
import Response from "../../../models/Response.js";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";

const router = nc();

router.get(
  "/api/response/companySelected",
  [verifyLoggedin],
  async (req, res) => {
    await dbConnect();
    try {
      Student.findOne({ email: req.headers.email })
        .populate("Postbystudent")
        .exec(function (err, student) {
          res.send(student.Postbystudent);
        });
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
