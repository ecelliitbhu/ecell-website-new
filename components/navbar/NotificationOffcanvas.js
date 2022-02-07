import { BsFillBellFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { Chip, Badge, Alert } from "@mui/material";
const NotificationOffCanvas = () => {
  return (
    <>
      <Badge
        badgeContent={3}
        color="error"
        id="notification-button"
        // className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNotification"
        aria-controls="offcanvasRight"
      >
        <BsFillBellFill
          style={{ fontSize: "1.5rem", color: "black" }}
        ></BsFillBellFill>
      </Badge>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNotification"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
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
        </div>
      </div>
    </>
  );
};

export default NotificationOffCanvas;
