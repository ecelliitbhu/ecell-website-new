import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getApplication(id, res);
    case "PUT":
      return updateApplication(id, req, res);
    case "DELETE":
      return deleteApplication(id, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get a single application
async function getApplication(id, res) {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        student: true,
        post: true,
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update an application (e.g., change status)
async function updateApplication(id, req, res) {
  try {
    const { status } = req.body;

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Delete an application (withdraw)
async function deleteApplication(id, res) {
  try {
    await prisma.application.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "Application withdrawn successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
