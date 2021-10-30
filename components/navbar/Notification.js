import Badge from "@mui/material/Badge";
import { BsFillBellFill } from "react-icons/bs";
import { Alert, Dropdown} from "react-bootstrap";

import Link from "next/link";
import { Chip } from "@mui/material";

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
        <Link href="https://dare2compete.com/competition/pitch-er-perfect-indian-institute-of-technology-iit-bhu-varanasi-225118">
          <Alert variant="success">
            Register for Pitch er perfect
            <Chip label="Click here!" color="warning" size="small" />
          </Alert>
        </Link>
        <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
        <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
