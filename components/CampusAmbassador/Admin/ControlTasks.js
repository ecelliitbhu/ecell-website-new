import { Box, Button, Modal, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ControlTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loader
    const [editingTask, setEditingTask] = useState(null);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const fetchTasks = async () => {
        setLoading(true); // Show loader while fetching tasks
        try {
            const response = await fetch(`${BACKEND_URL}/ambassador/getTasks`);
            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                toast.error("Error fetching tasks");
            }
        } catch (error) {
            toast.error("An error occurred while fetching tasks");
        } finally {
            setLoading(false); // Hide loader after fetching
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            const response = await fetch(`${BACKEND_URL}/ambassador/getTasks/${taskId}`, {
              method: "DELETE",
            });

            if (response.ok) {
                toast.success("Task deleted successfully!");
                fetchTasks();
            } else {
                toast.error("Error deleting task");
            }
        }
    };

    const handleSaveEdit = async () => {
        const response = await fetch(
          `${BACKEND_URL}/ambassador/tasks/${editingTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: editingTask.title,
              description: editingTask.description,
              lastDate: editingTask.lastDate,
            }),
          }
        );

        if (response.ok) {
            toast.success("Task updated successfully!");
            fetchTasks();
            setEditingTask(null);
        } else {
            toast.error("Error updating task");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <h3>All Tasks</h3>
            {loading ? ( // Show loader while tasks are being fetched
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {tasks.map((task) => (
                        <Box key={task.id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p><strong>Last Date:</strong> {new Date(task.lastDate).toLocaleDateString()}</p>
                            <p><strong>Points:</strong> {task.points}</p>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleEditTask(task)}
                                sx={{ mr: 2 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}
            {editingTask && (
                <Modal sx={{ p: 4, background: "red", borderRadius: 2 }}  open={true} onClose={() => setEditingTask(null)}>
                    <Box sx={{ p: 4, background: "white", borderRadius: 2 }}>
                        <h3>Edit Task</h3>
                        <TextField
                            label="Title"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Description"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Last Date"
                            value={editingTask.lastDate}
                            onChange={(e) => setEditingTask({ ...editingTask, lastDate: e.target.value })}
                            type="date"
                            fullWidth
                            sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant="contained" onClick={handleSaveEdit}>
                            Save
                        </Button>
                    </Box>
                </Modal>
            )}
        </Box>
    );
}
