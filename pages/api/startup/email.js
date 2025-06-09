import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Startup from "../../../models/Startup.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyEmail from "../../../middleware/VerifyEmail.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";

const router = nc();

router.get(
  "/api/startup/email/",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Startup.find({
        email: request.headers.email,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
