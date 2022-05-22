import { Badge, Chip, Alert } from "@mui/material";
import { BsFillBellFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";

const Notification = () => {
  return (
    <Dropdown className="notification">
      <Dropdown.Toggle
        style={{
          width: "fit-content",
          backgroundColor: "#f8f9fa",
          border: "none",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Badge 
        // badgeContent={3} 
        color="error">
          <BsFillBellFill
            style={{ fontSize: "1.5rem", color: "black" }}
          ></BsFillBellFill>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu className="notification-dropdown-menu">
        <h5>Notifications</h5>
        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
