import { Badge, Chip, Alert, Divider } from "@mui/material";
import { BsFillBellFill } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { firebaseDB } from "../../lib/firebase";

function todaysDate() {
  return new Date().toISOString().slice(0, 10);
}
let fx = 0.0;
const Notifi = ({ title, beginDate, endDate, description, knowMoreLink }) => {
  // console.log(title, description, endDate, beginDate, todaysDate());
  fx = fx + 1 / 2;
  console.log(fx);
  return (
    <Link href={knowMoreLink} passHref legacyBehavior>
      <Alert icon={false} severity={fx % 2 == 0 ? "warning" : "info"}>
        {description}
        <Chip
          label="Click here!"
          color="warning"
          size="small"
          style={{ margin: "0 10px", cursor: "pointer" }}
        />
        {endDate >= todaysDate() && beginDate <= todaysDate() && (
          <Chip
            label="New!!"
            color="success"
            size="small"
            style={{ margin: "0 10px", cursor: "pointer" }}
          />
        )}
      </Alert>
    </Link>
  );
};

const Notification = () => {
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
          notifs.reverse();
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
        <Badge badgeContent={notifsList.length} color="error">
          <BsFillBellFill
            style={{ fontSize: "1.5rem", color: "black" }}
          ></BsFillBellFill>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu className="notification-dropdown-menu">
        <h5>Notifications</h5>
        <Dropdown.Divider />
        {notifsList.map((notif, _id) => (
          <>
            <Notifi key={_id} {...notif} />
            <Divider />
          </>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notification;
