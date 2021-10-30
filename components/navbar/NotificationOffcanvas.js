import Badge from "@mui/material/Badge";
import { BsFillBellFill } from "react-icons/bs";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import { Chip } from "@mui/material";
const NotificationOffCanvas = () => {
  return (
    <>
      <Badge
        badgeContent={17}
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
        <Link href="https://dare2compete.com/competition/pitch-er-perfect-indian-institute-of-technology-iit-bhu-varanasi-225118">
          <Alert variant="success">
            Register for Pitch er perfect
            <Chip label="Click here!" color="warning" size="small" />
          </Alert>
        </Link>

          <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
          <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
        </div>
      </div>
    </>
  );
};

export default NotificationOffCanvas;
