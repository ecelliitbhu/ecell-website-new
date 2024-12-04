import React, { useState } from "react";
import { Tab, Tabs, Box, TextField, Button } from "@mui/material";
import Admin from "@/components/CampusAmbassador/admin"; // Your Admin component

function CAAdmin() {
  const [value, setValue] = useState(0); // State to manage which tab is active
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    points: "",
  }); // State for task creation form data

  const handleChange = (event, newValue) => {
    setValue(newValue); // Handle tab change
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Handle form input change
  };

  const handleCreateTask = async () => {
    // Send the POST request to the backend endpoint to create a task
    const { title, description, lastDate, points } = formData;
    
    if (!title || !description || !lastDate || !points) {
      alert("All fields are required!");
      return;
    }

    const response = await fetch("/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, lastDate, points }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Task successfully created!");
      setFormData({ title: "", description: "", lastDate: "", points: "" });
    } else {
      alert(`Error: ${data.error || "Something went wrong!"}`);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Assign Points" />
        <Tab label="Create Task" />
      </Tabs>

      {value === 0 && <Admin />} {/* Show Admin component for Assign Points */}

      {value === 1 && (
        <Box sx={{ p: 2 }}>
          <h3>Create a New Task</h3>
          <form noValidate autoComplete="off">
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
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleInputChange}
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTask}
            >
              Create Task
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default CAAdmin;
