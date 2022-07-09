import { Badge, Chip, Alert } from "@mui/material";
import { BsFillBellFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { collection, getDocs } from "@firebase/firestore";
import { firebaseDB, firestore } from "../../lib/firebase";
import { async } from "@firebase/util";
import { get } from "mongoose";

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

const Notification = () => {
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
        <Badge badgeContent={1} color="error">
          <BsFillBellFill
            style={{ fontSize: "1.5rem", color: "black" }}
          ></BsFillBellFill>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu className="notification-dropdown-menu">
        <h5>Notifications</h5>
        <Dropdown.Divider />
        {notifsList.map((notif, _id) => (
          <Notifi key={notif.id} {...notif} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
