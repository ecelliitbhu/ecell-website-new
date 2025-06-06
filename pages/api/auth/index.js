import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";

const router = nc();

router.get("/api/auth", [verifyLoggedin], (req, res) => {
  res.send("Logged In");
});

export default router;
