import { createRequire } from "module";
const require = createRequire(import.meta.url);
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import verifyGammaAdmin from "../../../middleware/VerifyGammaAdmin.js";
import NormalAdmin from "../../../models/NormalAdmin.js";
import Blog from "../../../models/Blog.js";
import Schemes from "../../../models/Schemes.js";
import Student from "../../../models/Student.js";
import Startup from "../../../models/Startup.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";

const router = nc();

router.post(
  "/api/normalAdmin/unregistered/",
  [verifyLoggedin, verifyGammaAdmin],
  async (req, res) => {
    await dbConnect();
    try {
      let finder1 = await Student.find({
        email: req.headers.email,
      });

      let finder2 = await NormalAdmin.find({
        email: req.headers.email,
      });

      if (finder1.length == 0 && finder2.length == 0) {
        NormalAdmin.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          postByNormalAdmin: [new Blog({}), new Schemes({}), new Startup({})],
        });
        res.status(201).send("Email given admin rights");
      } else {
        res.status(401).send("User exists");
      }
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
