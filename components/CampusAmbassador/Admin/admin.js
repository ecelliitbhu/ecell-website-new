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
        const response = await axios.get(`${BASE_URL}/ambassador/admin/tasks`);
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
  const handleAssignPoints = async (userId, taskId, points, action) => {
    setAssigning(true);
    try {
      await axios.post(`${BASE_URL}/ambassador/admin/tasks`, {
        userId,
        taskId,
        points,
        action,
      });
      
      alert('Points successfully assigned!');
      // Refresh data after assignment
      const response = await axios.get(`${BASE_URL}/ambassador/admin/tasks`);
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
                <TableCell>User Email</TableCell>
                <TableCell>Total Points</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user) => (
                user.ambassador && <TableRow key={user.userId}>
                  <TableCell>{user.ambassador.name}</TableCell>
                  <TableCell>{user.ambassador.email}</TableCell>
                  <TableCell>{user.ambassador.points}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <b>Submission:</b> {user.submission?<a href={user.submission} target="_blank" >Open submission</a> : 'Not submitted'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                      {user.status === "pending" && <Box mb={2}>
                        <Typography variant="subtitle1">
                          <b>Title:</b> {user.task.taskTitle}
                        </Typography>
                        <Typography variant="body2">
                          <b>Points:</b> {user.task.points || 0}
                        </Typography>
                        <Box display="flex" gap={2} mt={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            // disabled={assigning||!(user.submission)}
                            onClick={async () =>
                              await handleAssignPoints(user.ambassador.id, user.task.id, parseInt(user.task.points), "approve")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            // disabled={assigning||!(user.submission)}
                            onClick={async () =>
                              await handleAssignPoints(user.ambassador.id, user.task.id, parseInt(user.task.points), "reject")
                            }
                          >
                            Reject
                          </Button>
                        </Box>
                      </Box>}
                      {
                        user.status === "approved" && <Typography variant="body2">
                          <b>Approve:</b> {user.task.points || 0}
                        </Typography>
                      }

                       {
                        user.status === "rejected" && <Typography variant="body2">
                          <b>Reject:</b> {0}
                        </Typography>
                      }
                     
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
