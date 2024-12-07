import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function Admin() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [points, setPoints] = useState({});
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/admin/tasks`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle point assignment
  const handleAssignPoints = async (userId, taskId) => {
    if (!points[taskId]) return alert('Please enter points before assigning.');

    setAssigning(true);
    try {
      await axios.post(`${BASE_URL}/admin/tasks`, {
        userId,
        taskId,
        points: parseInt(points[taskId]),
      });
      alert('Points successfully assigned!');
      // Refresh data after assignment
      const response = await axios.post(`${BASE_URL}/admin/tasks`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error assigning points:', error);
      alert('Failed to assign points.');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Box flexDirection={"column"} alignContent={"center"} p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
    </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>College Name</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell>Tasks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.collegeName}</TableCell>
                  <TableCell>{user.totalPoints}</TableCell>
                  <TableCell>
                    {user.tasks.map((task) => (
                      <Box key={task.taskId} mb={2}>
                        <Typography variant="subtitle1">
                          <b>Title:</b> {task.taskTitle}
                        </Typography>
                        <Typography variant="body2">
                          <b>Submission:</b> {task.submission || 'Not submitted'}
                        </Typography>
                        <Typography variant="body2">
                          <b>Points:</b> {task.taskPoints || 0}
                        </Typography>
                        <Box display="flex" gap={2} mt={1}>
                          <TextField
                            label="Points"
                            variant="outlined"
                            size="small"
                            value={points[task.taskId] || ''}
                            onChange={(e) =>
                              setPoints({
                                ...points,
                                [task.taskId]: e.target.value,
                              })
                            }
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={assigning||!(task.submission)}
                            onClick={() =>
                              handleAssignPoints(user.userId, task.taskId)
                            }
                          >
                            Assign
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Admin;
