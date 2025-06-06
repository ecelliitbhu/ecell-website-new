import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    collegeName,
    collegeYear,
    program,
    phone,
    email,
    POR,
    reasonToJoin,
    roleInStudentBody,
    skills,
    experience,
    roleInEcell,
    hours,
    contribution,
    motivation,
  } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await prisma.campusAmbassador.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      console.log("User found");
      return res.status(400).json({
        error: "You have already submitted the form",
        user: existingUser,
      });
    }

    existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: { email: email },
      });
    }

    // Create a new user
    const newUser = await prisma.campusAmbassador.create({
      data: {
        userId: existingUser.id,
        name,
        collegeName,
        collegeYear,
        program,
        phone,
        email,
        POR,
        reasonToJoin,
        roleInStudentBody,
        skills,
        experience,
        roleInEcell,
        hours,
        contribution,
        motivation,
        points: 0,
      },
    });

    // Get all active tasks
    const activeTasks = await prisma.task.findMany();

    // Create a submission object for each task and connect the user
    const submissionsData = activeTasks.map((task) => ({
      taskId: task.id,
      userEmail: newUser.email,
      submission: "",
      status: "pending",
    }));

    // Create submissions for all tasks linked to the new user
    await prisma.submission.createMany({
      data: submissionsData,
    });

    // Connect user to tasks
    for (const task of activeTasks) {
      await prisma.task.update({
        where: { id: task.id },
        data: {
          users: {
            connect: { id: newUser.id },
          },
        },
      });
    }

    res.status(201).json({
      message:
        "User successfully registered and tasks assigned with submissions!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Unable to add user" });
  }
}
