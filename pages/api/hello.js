// pages/api/hello.js
import nc from "next-connect";
import verifyAdmin from "../../middleware/VerifyAdmin";
import dbConnect from '../../lib/dbConnect.js'

const router = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})

router.get("/api/hello",[verifyAdmin],async (request,response)=> {
  // await verifyAdmin(request,response);
  response.send({
    message : "Successful"
  })
})

export default router;
