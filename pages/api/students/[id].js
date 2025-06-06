import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getStudent(id, res);
    case "PUT":
      return updateStudent(id, req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get a student profile
async function getStudent(id, res) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: id },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
        applications: {
          include: {
            post: true,
          },
        },
      },
    });

    // if (!student) {
    //   return res.status(404).json({ message: "Student not found" });
    // }
    if (!student) {
      return res.status(401).json({
        error: "STUDENT_NOT_FOUND",
        message: "To access student dashboard, kindly login as student",
        redirectTo: "/sip/login",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update a student profile
async function updateStudent(id, req, res) {
  try {
    const {
      name,
      rollNo,
      branch,
      cpi,
      courseType,
      year,
      linkedinUrl,
      githubUrl,
      resumeUrl,
    } = req.body;

    const student = await prisma.student.update({
      where: { userId: id },
      data: {
        name,
        rollNo,
        branch,
        cpi,
        courseType,
        year,
        linkedinUrl,
        githubUrl,
        resumeUrl,
      },
    });

    return res.status(200).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
