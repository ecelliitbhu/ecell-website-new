import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Blog from "../../../models/Blog.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";

const router = nc();

router.get(
  "/api/blogs/email/",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Blog.find({
        email: request.headers.email,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
