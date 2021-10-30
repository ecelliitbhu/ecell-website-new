import Badge from "@mui/material/Badge";
import { BsFillBellFill } from "react-icons/bs";
import { Alert } from "react-bootstrap";
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
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <BsFillBellFill
          style={{ fontSize: "1.5rem", color: "black" }}
        ></BsFillBellFill>
      </Badge>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
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
          <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
          <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
          <Alert variant="success">lorea vjhvahj ahjav hjgav</Alert>
        </div>
      </div>
    </>
  );
};

export default NotificationOffCanvas;
