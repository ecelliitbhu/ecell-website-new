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
        <Badge badgeContent={17} color="error">
          <BsFillBellFill
            style={{ fontSize: "1.5rem", color: "black" }}
          ></BsFillBellFill>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu className="notification-dropdown-menu">
        <h5>Notifications</h5>
        <Dropdown.Divider />
        <Link href="https://dare2compete.com/competition/pitch-er-perfect-indian-institute-of-technology-iit-bhu-varanasi-225118">
          <Alert icon={false} severity="info">
            Register for Pitch er perfect{" "}
            <Chip label="Click here!" color="warning" size="small" />
          </Alert>
        </Link>
        <Alert icon={false} severity="warning">
          lorea vjhvahj ahjav hjgav
        </Alert>
        <Alert icon={false} severity="success">
          lorea vjhvahj ahjav hjgav
        </Alert>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
