import React from 'react'
import { Box, Button, Modal, TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateTask() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        lastDate: "",
        points: "",
      }); // State for task creation form data
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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
    
        const response = await fetch(`${BACKEND_URL}/ambassador/createTask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, lastDate, points }),
        });
    
        const data = await response.json();
        if (response.ok) {
          toast.success("Task successfully created!");
          setFormData({ title: "", description: "", lastDate: "", points: "" });
        } else {
          toast.error(`Error: ${data.error || "Something went wrong!"}`);
        }
      };
  return (
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
  )
}
