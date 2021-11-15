import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Student from "../../../models/Student.js";
import Response from "../../../models/Response.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyEmail from "../../../middleware/VerifyEmail.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import { appendFile } from "fs";

const router = nc();

router.get(
  "/api/student/id/",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Student.find({
        email: request.headers.email,
        _id: request.body.id,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
