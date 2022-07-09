import { Badge, Chip, Alert } from "@mui/material";
import { BsFillBellFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { firebaseDB } from "../../lib/firebase";
const Notifi = ({ title, description, knowMoreLink }) => {
  // console.log(title, description);
  return (
    <Link href={knowMoreLink} passHref>
      <Alert icon={false} severity="warning">
        {description}
        <Chip
          label="Click here!"
          color="warning"
          size="small"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
      </Alert>
    </Link>
  );
};
const NotificationOffCanvas = () => {
  const initialNotifState = {
    title: "",
    description: "",
    isActive: true,
    knowMoreLink: "",
  };
  const [notif, setNotif] = useState(initialNotifState);
  const [notifsList, setNotifsList] = useState([]);

  useEffect(() => {
    onValue(
      ref(firebaseDB, `notifs/`),
      (snapshot) => {
        if (snapshot.exists()) {
          // console.log(Object.entries(snapshot.val()));
          let notifs = Object.entries(snapshot.val());
          notifs = notifs.map((notif) => {
            return { id: notif[0], ...notif[1] };
          });
          setNotifsList(notifs);
        } else {
          // console.log("No data available");
          setNotifsList([]);
        }
        // setIsloading(false);
      },
      (error) => console.log(error)
    );
  }, []);
  return (
    <>
      <Badge
        badgeContent={notifsList.length}
        color="error"
        id="notification-button"
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
          {notifsList.map((notif, _id) => (
            <Notifi key={notif.id} {...notif} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationOffCanvas;
