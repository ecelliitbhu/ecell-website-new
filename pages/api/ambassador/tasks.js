import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not logged in" });
    }

    try {
      // Fetch the user based on userId
      const user = await prisma.campusAmbassador.findUnique({
        where: { id: Number(userId) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userEmail = user.email;

      // Fetch tasks associated with the user
      const tasks = await prisma.task.findMany({
        where: {
          users: {
            some: {
              id: Number(userId),
            },
          },
        },
        select: {
          id: true,
          title: true,
          lastDate: true,
          description: true,
          points: true,
          status: true,
          submissions: {
            where: {
              userEmail: userEmail,
            },
            select: {
              status: true,
              taskId: true,
            },
          },
        },
      });

      const currentDate = new Date();

      const processedTasks = tasks.map((task) => {
        let status = "Pending";
        const submission = task.submissions.find(
          (sub) => sub.taskId === task.id
        );

        if (submission) {
          if (submission.status === "pending") {
            status = "Pending";
          } else if (submission.status === "submitted") {
            status = "Submitted";
          }
        } else if (!submission && task.lastDate < currentDate) {
          status = "Missing";
        }

        return {
          id: task.id,
          title: task.title,
          description: task.description,
          status: status,
          submitted: status === "Submitted",
          lastDate: task.lastDate,
        };
      });

      res.status(200).json(processedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching tasks info" });
    }
  } else if (req.method === "POST") {
    const { title, description, lastDate, points } = req.body;

    // Validate input
    if (!title || !description || !lastDate || !points) {
      return res
        .status(400)
        .json({
          error: "Title, description, lastDate, and points are required",
        });
    }

    try {
      // Create a task
      const task = await prisma.task.create({
        data: {
          title,
          description,
          lastDate: new Date(lastDate),
          points: Number(points),
          submitted: false,
        },
      });

      // Get all users
      const users = await prisma.campusAmbassador.findMany({
        select: { id: true, email: true },
      });

      if (users.length === 0) {
        return res
          .status(400)
          .json({ error: "No users found to assign tasks." });
      }

      // Prepare submission objects for each user
      const submissions = users.map((user) => ({
        taskId: task.id,
        userEmail: user.email,
        submission: "",
        status: "pending",
      }));

      // Create submissions for each user
      await prisma.submission.createMany({
        data: submissions,
      });

      // Associate the created task with all users
      await prisma.task.update({
        where: { id: task.id },
        data: {
          users: {
            connect: users.map((user) => ({ id: user.id })),
          },
        },
      });

      res.status(201).json({
        message:
          "Task successfully created, assigned to all users, and submissions created!",
      });
    } catch (error) {
      console.error("Error creating tasks:", error);
      res.status(500).json({ error: "An error occurred while creating tasks" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
