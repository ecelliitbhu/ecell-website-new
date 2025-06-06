import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { taskId, userId, points } = req.body;

  try {
    if (taskId && userId && points) {
      // Step 1: Get the user's email using the userId
      const user = await prisma.campusAmbassador.findUnique({
        where: { id: userId },
        select: { email: true },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Step 2: Update the user's total points
      const updatedUser = await prisma.campusAmbassador.update({
        where: { id: userId },
        data: {
          points: {
            increment: points,
          },
        },
      });

      return res.status(200).json({
        message: "Points successfully assigned to the user-task submission!",
      });
    } else {
      // If no taskId, userId, or points provided, return all users' responses
      const userResponses = await prisma.campusAmbassador.findMany({
        select: {
          id: true,
          name: true,
          collegeName: true,
          points: true,
          email: true,
          tasks: {
            select: {
              id: true,
              title: true,
              points: true,
              submissions: {
                select: {
                  userEmail: true,
                  status: true,
                  submission: true,
                },
              },
            },
          },
        },
      });

      // Format responses and count completed tasks
      const formattedResponses = userResponses.map((user) => {
        const completedTasksCount = user.tasks.filter((task) =>
          task.submissions.some(
            (submission) =>
              submission.status === "submitted" &&
              submission.userEmail === user.email
          )
        ).length;

        return {
          userId: user.id,
          userName: user.name,
          collegeName: user.collegeName,
          totalPoints: user.points,
          completedTasksCount,
          tasks: user.tasks.map((task) => {
            const userSubmission = task.submissions.find(
              (submission) => submission.userEmail === user.email
            );
            return {
              taskId: task.id,
              taskTitle: task.title,
              submission: userSubmission ? userSubmission?.submission : null,
              submitted: userSubmission?.status == "submitted",
              taskPoints: task?.points,
            };
          }),
        };
      });

      // Sort users by completed tasks count in descending order
      formattedResponses.sort(
        (a, b) => b.completedTasksCount - a.completedTasksCount
      );

      return res.status(200).json(formattedResponses);
    }
  } catch (error) {
    console.error("Error in admin tasks endpoint:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}
