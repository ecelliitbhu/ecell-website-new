import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { taskId, submission, email } = req.body;

  try {
    // Step 1: Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Step 2: Find the task by taskId
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Step 3: Check if a submission already exists for this user and task
    let submissionRecord = await prisma.submission.findUnique({
      where: {
        userEmail_taskId: {
          userEmail: user.email,
          taskId: taskId,
        },
      },
    });

    if (submissionRecord) {
      // If a submission already exists, update it
      submissionRecord = await prisma.submission.update({
        where: {
          id: submissionRecord.id,
        },
        data: {
          submission: submission,
          status: "submitted",
        },
      });
    } else {
      // If no submission exists, create a new one
      await prisma.submission.create({
        data: {
          taskId: task.id,
          userEmail: user.email,
          submission: submission,
          status: "submitted",
        },
      });
    }

    res.status(200).json({
      message: "Task submission updated successfully.",
    });
  } catch (error) {
    console.error("Error updating task submission:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task submission." });
  }
}
