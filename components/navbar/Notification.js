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
        <Badge badgeContent={3} color="error">
          <BsFillBellFill
            style={{ fontSize: "1.5rem", color: "black" }}
          ></BsFillBellFill>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu className="notification-dropdown-menu">
        <h5>Notifications</h5>
        <Dropdown.Divider />
        <a href="https://bit.ly/novice-fiesta-results">
          <Alert icon={false} severity="warning">
            Results of Novice Fiesta are out! Check Now!
            <Chip label="Click here!" color="warning" size="small" />
          </Alert>
        </a>
        <a href="https://instagram.com/ecelliitbhu">
          <Alert icon={false} severity="info">
            Stay tuned with E-Summit!
            <Chip label="Click here!" color="warning" size="small" />
          </Alert>
        </a>
        {/* <a href="https://instagram.com/ecelliitbhu"> */}
          <Alert icon={false} severity="success">
            Registrations for IDAPT-HUB Pitch Challenge is open!
          </Alert>
        {/* </a> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
