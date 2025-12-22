import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import toast from "react-hot-toast";

export default function CreateTask() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [taskType, setTaskType] = useState("DRIVE_LINK");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    points: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, options: updated }));
  };
  const isMCQ = taskType === "DAILY_MCQ";

  const handleCreateTask = async () => {
    const { lastDate, points } = formData;

    if (!lastDate || !points) {
      toast.error("Last date and points are required!");
      return;
    }

    let payload = {
      taskType,
      lastDate,
      points,
    };

    /* ---------- TITLE + DESCRIPTION TASKS ---------- */
    if (!isMCQ) {
      const { title, description } = formData;

      if (!title || !description) {
        toast.error("Title and description are required!");
        return;
      }

      payload.title = title;
      payload.description = description;
    }

    /* ---------- DAILY MCQ TASK ---------- */
    if (isMCQ) {
      const { question, options, correctOption } = formData;

      if (!question) {
        toast.error("Question is required!");
        return;
      }

      if (options.some((opt) => !opt)) {
        toast.error("All options must be filled!");
        return;
      }

      if (correctOption === "") {
        toast.error("Please select the correct option!");
        return;
      }

      payload.question = question;
      payload.options = options;
      payload.correctOption = options[correctOption];
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/ambassador/createTask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Task created successfully!");
        setFormData({
          title: "",
          description: "",
          lastDate: "",
          points: "",
          question: "",
          options: ["", "", "", ""],
          correctOption: "",
        });
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY: "auto",
        py: 6,
        px: 2,
        background:
          "linear-gradient(180deg, #FFF3E0 0%, #FFFFFF 60%)",
      }}
    >
      <Box sx={{ maxWidth: 650, mx: "auto" }}>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            borderTop: "6px solid #F57C00",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ color: "#EF6C00" }}
            gutterBottom
          >
            Create New Task
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#546E7A", mb: 2 }}
          >
            E-Cell IIT BHU · Admin Panel
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* TASK TYPE */}
          <TextField
            select
            label="Task Type"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <MenuItem value="DRIVE_LINK">
              Drive Link Task
            </MenuItem>
            <MenuItem value="DAILY_MCQ">
              Daily MCQ Task
            </MenuItem>
            <MenuItem value="DAILY_EMOJI">
              Daily Emoji Task
            </MenuItem>
          </TextField>

          {/* TITLE + DESCRIPTION */}
          {!isMCQ && (
            <>
              <TextField
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Task Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
            </>
          )}

          {/* DAILY MCQ */}
          {isMCQ && (
            <>
              <TextField
                label="MCQ Question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />

              {formData.options.map((opt, i) => (
                <TextField
                  key={i}
                  label={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(i, e.target.value)
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
              ))}

              <TextField
                select
                label="Correct Option"
                value={formData.correctOption}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    correctOption: e.target.value,
                  }))
                }
                fullWidth
                sx={{ mb: 3 }}
              >
                {formData.options.map((_, i) => (
                  <MenuItem key={i} value={i}>
                    Option {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {/* COMMON FIELDS */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              label="Last Date"
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>

          <Button
            fullWidth
            size="large"
            onClick={handleCreateTask}
            sx={{
              py: 1.4,
              fontWeight: 700,
              fontSize: "1rem",
              background:
                "linear-gradient(90deg, #F57C00, #EF6C00)",
              color: "#fff",
              borderRadius: 2,
              "&:hover": {
                background:
                  "linear-gradient(90deg, #EF6C00, #E65100)",
              },
            }}
          >
            Create Task
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
