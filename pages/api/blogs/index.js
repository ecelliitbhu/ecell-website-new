import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import Blog from "../../../models/Blog.js";
import verifyAdmin from "../../../middleware/VerifyAdmin.js";
import verifyLoggedin from "../../../middleware/VerifyLoggedin.js";

const router = nc();

router.post(
  "/api/blogs",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      Blog.create({
        email: request.headers.email,
        createdBy: request.body.createdBy,
        blogName: request.body.blogName,
        blogSubheading: request.body.blogSubheading,
        description: request.body.description,
      });
      response.send("Blog Posted");
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.get(
  "/api/blogs",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Blog.find();
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.put(
  "/api/blogs",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Blog.find({
        email: request.headers.email,
        _id: request.body.id,
      });
      if (finder.length > 0) {
        await Blog.updateOne(
          {
            email: request.headers.email,
            _id: request.body.id,
          },
          {
            $set: {
              createdBy: request.body.createdBy,
              blogSubheading: request.body.blogSubheading,
              blogName: request.body.blogName,
              description: request.body.description,
            },
          }
        );
        response.status(201).send("Blog updated");
      } else {
        response.status(404).send("Blog not found");
      }
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

router.delete(
  "/api/blogs",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Blog.find({
        // email : request.headers.email,
        _id: request.headers.id,
      });
      if (finder.length > 0) {
        await Blog.findOneAndDelete({
          // email : request.headers.email,
          _id: request.headers.id,
        });
        response.status(201).send("Blog deleted");
      } else {
        response.status(404).send("Blog not found");
      }
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
