import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Events from "../../../models/Events.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";
import * as moment from "moment";

const router = nc();

router.post(
  "/api/events",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      const startDate = moment(request.body.startDate).format(
        "YYYY-MM-DDThh:mm:ss.000+00:00"
      );
      const endDate = moment(request.body.endDate).format(
        "YYYY-MM-DDThh:mm:ss.000+00:00"
      );
      const internalStartDate = moment(request.body.startDate).format(
        "YYYY-MM-DDT00:00:00.000+00:00"
      );
      const internalEndDate = moment(request.body.endDate).format(
        "YYYY-MM-DDT23:59:59.000+00:00"
      );
      const newEvent = {
        title: request.body.title,
        description: request.body.description,
        link: request.body.link || "No Link",
        startDate: startDate,
        internalStartDate: internalStartDate,
        endDate: endDate,
        internalEndDate: internalEndDate,
        createdBy: request.body.createdBy || "Unknown",
      };
      console.log(newEvent);
      const res = new Events(newEvent);
      res.save();
      response.send({ message: "Events Posted" });
    } catch (error) {
      response.send({ error: "Some error happened" });
    }
  }
);

router.get("/api/events", async (request, response) => {
  await dbConnect();
  try {
    const startDate = moment(request.headers.startdate).format(
      "YYYY-MM-DDThh:mm:ss.000+00:00"
    );
    const endDate = moment(request.headers.enddate).format(
      "YYYY-MM-DDThh:mm:ss.000+00:00"
    );
    let finder = await Events.find({
      internalStartDate: {
        $lte: startDate,
      },
      internalEndDate: {
        $gte: startDate,
      },
    });
    response.status(201).send(finder);
  } catch (error) {
    response.send({ error });
  }
});

router.put(
  "/api/Eventss",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      const startDate = moment(request.body.startDate).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      const endDate = moment(request.body.endDate).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      const internalStartDate = moment(request.body.startDate).format(
        "YYYY-MM-DDT00:00:00"
      );
      const internalEndDate = moment(request.body.endDate).format(
        "YYYY-MM-DDT23:59:59"
      );
      let finder = await Events.find({
        _id: request.body.id,
      });
      if (finder.length > 0) {
        await Events.updateOne(
          {
            _id: request.body.id,
          },
          {
            $set: {
              title: request.body.title,
              description: request.body.description,
              link: request.body.link || "",
              startDate,
              internalStartDate,
              endDate,
              internalEndDate,
            },
          }
        );
        response.status(201).send("Events updated");
      } else {
        response.status(404).send("Events not found");
      }
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.delete(
  "/api/Eventss",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Events.find({
        // email : request.headers.email,
        _id: request.headers.id,
      });
      if (finder.length > 0) {
        await Events.findOneAndDelete({
          // email : request.headers.email,
          _id: request.headers.id,
        });
        response.status(201).send("Events deleted");
      } else {
        response.status(404).send("Events not found");
      }
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
