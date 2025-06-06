import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getApplications(req, res);
    case "POST":
      return createApplication(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get applications (filtered by student or post if provided)
async function getApplications(req, res) {
  try {
    const { studentId, postId } = req.query;
    console.log("Fetching applications with filters:", { studentId, postId });

    const where = {};
    if (studentId) where.studentId = studentId;
    if (postId) where.postId = postId;

    const applications = await prisma.application.findMany({
      where,
      include: {
        student: {
          include: {
            user: {
              select: {
                email: true,
                createdAt: true,
              },
            },
          },
        },
        post: {
          include: {
            recruiter: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    console.log(`Found ${applications.length} applications`);
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Create a new application
async function createApplication(req, res) {
  try {
    const { studentId, postId } = req.body;
    console.log("Creating application:", { studentId, postId });

    // Check if application already exists
    const existingApplication = await prisma.application.findFirst({
      where: {
        studentId,
        postId,
      },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this position" });
    }

    const application = await prisma.application.create({
      data: {
        studentId,
        postId,
        status: "PENDING",
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        post: {
          include: {
            recruiter: true,
          },
        },
      },
    });

    console.log("Application created successfully:", application.id);
    return res.status(201).json(application);
  } catch (error) {
    console.error("Error creating application:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
