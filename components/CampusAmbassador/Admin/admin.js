import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Chip,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
export default function Type1Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/ambassador/type1-submissions`
      );
      const data = await res.json();
      if (res.ok) setSubmissions(data);
      else toast.error("Failed to fetch submissions");
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/ambassador/type1-submissions/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error();
      setSubmissions((prev) => {
        const updated = prev.map((s) =>
          s.id === id ? { ...s, status } : s
        );
        // pending top pe rahege baki sab niche ( accpet ya reject )
        return [
          ...updated.filter((s) => s.status === "pending"),
          ...updated.filter((s) => s.status !== "pending"),
        ];
      });

      toast.success(`Submission ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getBgColor = (status) => {
    if (status === "accepted") return "#e8f5e9";
    if (status === "rejected") return "#fdecea";
    return "#f9f9f9";
  };

  if (loading) {
    return (
      <Box sx={{ height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
        Task Submissions (Drive Link)
      </Typography>

      {submissions.map((s) => (
        <Paper
          key={s.id}
          sx={{
            p: 3,
            mb: 2,
            borderRadius: 2,
            backgroundColor: getBgColor(s.status),
          }}
          elevation={3}
        >
          <Stack spacing={1}>
            <Typography fontWeight={600}>
              {s.taskTitle}
            </Typography>

            <Typography variant="body2">
              Student: <strong>{s.studentName || "N/A"}</strong>
            </Typography>

            <Typography variant="body2">
              Submitted Link:{" "}
              <a
                href={s.driveLink}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#1976d2" }}
              >
                Open Drive Link
              </a>
            </Typography>

            <Chip
              label={s.status.toUpperCase()}
              color={
                s.status === "accepted"
                  ? "success"
                  : s.status === "rejected"
                  ? "error"
                  : "warning"
              }
              sx={{ width: "fit-content" }}
            />

            <Stack direction="row" spacing={2} mt={1}>
              <Button
                variant="contained"
                color="success"
                disabled={s.status === "accepted"}
                onClick={() => updateStatus(s.id, "accepted")}
              >
                Accept
              </Button>

              <Button
                variant="contained"
                color="error"
                disabled={s.status === "rejected"}
                onClick={() => updateStatus(s.id, "rejected")}
              >
                Reject
              </Button>
              
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}
