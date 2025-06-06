import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      return getPost(id, res);
    case "PUT":
      return updatePost(id, req, res);
    case "DELETE":
      return deletePost(id, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get a single post
async function getPost(id, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        recruiter: true,
        applications: {
          include: {
            student: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update a post
async function updatePost(id, req, res) {
  try {
    const {
      companyName,
      jobTitle,
      jobDescription,
      qualification,
      experience,
      stipend,
      requiredSkills,
      location,
      jobType,
    } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        companyName,
        jobTitle,
        jobDescription,
        qualification,
        experience,
        stipend,
        requiredSkills,
        location,
        jobType,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a post
async function deletePost(id, res) {
  try {
    // First delete all applications for this post
    await prisma.application.deleteMany({
      where: { postId: id },
    });

    // Then delete the post
    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
