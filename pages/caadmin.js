import React, { useState, useEffect } from "react";
import { Tab, Tabs, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import Admin from "@/components/CampusAmbassador/Admin/admin"; // Your Admin component
import CreateTask from "@/components/CampusAmbassador/Admin/CreateTask";
import ControlTasks from "@/components/CampusAmbassador/Admin/ControlTasks";
import { useRouter } from "next/router"; // For redirecting if not admin
import toast from "react-hot-toast";

function CAAdmin() {
  const [value, setValue] = useState(0); // State to manage which tab is active
  const [isAdmin, setIsAdmin] = useState(false); // Admin check status
  const [loading, setLoading] = useState(true); // Loading state for checking admin
  const [email, setEmail] = useState(""); // Email state
  const [openModal, setOpenModal] = useState(true); // Modal open state
  const router = useRouter(); // Router for redirection


      const checkAdmin = async () => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/checkAdminEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
          } else {
            toast.error("You are not authorized to access this page.");
            router.push("/"); // Redirect if not admin
          }
        } catch (error) {
          console.error("Error checking admin email:", error);
          toast.error("An error occurred while checking your admin status.");
          router.push("/"); // Redirect to login in case of an error
        } finally {
          setLoading(false);
          setOpenModal(false); // Close the modal after check is complete
        }
      };


  const handleChange = (event, newValue) => {
    setValue(newValue); // Handle tab change
  };

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error("Email is required to proceed.");
      return;
    }
    else{
      checkAdmin();
    }
  };

  if (loading) return( <Dialog open={openModal} onClose={() => setOpenModal(false)}>
  <DialogTitle>Enter Your Email</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Email Address"
      type="email"
      fullWidth
      variant="outlined"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenModal(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleEmailSubmit} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>
)// Show loading until check is complete

  return (
    <Box sx={{ width: "100%" }}>
      {/* Email Input Modal */}

      {/* Tabs and Admin Content */}
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Assign Points" />
        <Tab label="Create Task" />
        <Tab label="View All Tasks" />
      </Tabs>

      {value === 0 && <Admin />} {/* Show Admin component for Assign Points */}
      {value === 1 && <CreateTask />}
      {value === 2 && <ControlTasks />}
    </Box>
  );
}

export default CAAdmin;
