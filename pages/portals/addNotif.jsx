import { Card, Button } from "react-bootstrap";
import Image from "next/image";
import { firebaseDB as db } from "../../lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseconfig } from "../../lib/firebase"
 import {
  ref,
  set,
  getDatabase,
  get,
  child,
  update,
  onValue,
} from "firebase/database";
import {
  getStorage,
  ref as firebaseStorageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";
import { useEffect, useState } from "react";

const Notifi = ({
  title,
  editNotif,
  deleteNotif,
  description,
  beginDate,
  endDate,
  knowMoreLink,
}) => {
  //   console.log(title, description);
  return (
    <div
      style={{
        border: "2px solid black",
        // width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
      }}
    >
      <div style={{ height: "70px", width: "70px" }}>
        {/* <Image src={poster} alt="" height={1000} width={1000} /> */}
      </div>
      <span>{`Title: ${title}`}</span>
      <span>{`BeginDate: ${beginDate}`}</span>
      <span>{`End Date: ${endDate}`}</span>
      <p>{`Description: ${description}`}</p>
      <span>{`Know More link: ${knowMoreLink}`}</span>
      <Button variant="danger" onClick={deleteNotif}>
        Delete
      </Button>
      <Button variant="warning" onClick={editNotif}>
        Edit
      </Button>
    </div>
  );
};

const AddNotif = () => {
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function logout(e) {
    e.preventDefault();
    // logoutSuperAdmin();
  }
  const initialNotifState = {
    title: "",
    beginDate: "",
    endDate: "",
    description: "",
    isActive: true,
    knowMoreLink: "",
  };
  const [notif, setNotif] = useState(initialNotifState);
  const [notifsList, setNotifsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    set(ref(db, `notifs/${notifsList[id].id}`), null)
      .then(() => {
        setIsLoading(false);
        alert("Notification deleted successfully");
      })
      .catch((error) => alert(error.message));
  };

  const handleEdit = async (id) => {
    setNotif(notifsList[id]);
    setIsEditing(id + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      title,
      beginDate,
      endDate,
      description,
      isActive,
      knowMoreLink,
    } = notif;
    setIsLoading(true);
    const storage = getStorage();
    const imageName = title + "_" + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `notifs/${isEditing ? id : imageName}`
    );
    // const metadata =
    //   typeof poster == "string" ? null : { contentType: poster.type };
    const desertRef = firebaseStorageRef(storage, `notifs/${id}`);
    isEditing &&
      deleteObject(desertRef)
        .then(() => {
          console.log("file deleted successfully");
        })
        .catch((error) => {
          alert(error.message);
        });
    uploadBytes(storageRef).then((snapshot) => {
      getDownloadURL(
        firebaseStorageRef(storage, `notifs/${isEditing ? id : imageName}`)
      )
        .then(() => {
          set(ref(db, `notifs/${isEditing ? id : imageName}`), {
            title,
            beginDate,
            endDate,
            description,
            isActive,
            knowMoreLink,
          })
            .then(() => {
              alert("Form submitted successfully");
            })
            .catch((error) => alert(error.message));
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoading(false);
      setNotif(initialNotifState);
      setIsEditing(false);
    });
  };


  const app = initializeApp(firebaseconfig);
  const firestore = getFirestore(app);
  const getPasswordFromFirestore = async () => {
    const snapshot = await getDocs(collection(firestore, "Passwords"));
    var stored = "";

    snapshot.forEach((doc) => {
      stored = doc.data().password;
    });
    return stored;
  };

  const handleCheckPassword = async () => {
    const storedPassword = await getPasswordFromFirestore();
    if (storedPassword && password === storedPassword) {
      setPassword(password);
      setIsPasswordValid(true);
    } else {
      setPassword(password);
      setIsPasswordValid(false);
      alert("Password does not match.");
    }
  };

  useEffect(() => {
    onValue(
      ref(db, `notifs/`),
      (snapshot) => {
        if (snapshot.exists()) {
          // console.log(Object.entries(snapshot.val()));
          let notifs = Object.entries(snapshot.val());
          notifs = notifs.map((notif) => {
            return { id: notif[0], ...notif[1] };
          });
          setNotifsList(notifs);
        } else {
          console.log("No data available");
          setNotifsList([]);
        }
        // setIsloading(false);
      },
      (error) => console.log(error)
    );
  }, [isLoading]);
  return (
    <>
      {isPasswordValid === false && (
        <Card style={{ margin: "50px auto", width: "30%" ,height:"20%"}}>
          <Card.Body>
        <form onSubmit={handleSubmit}>
        <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
          <label>
            Enter Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button type="submit" className="my-2" onClick={handleCheckPassword}>
            Submit
          </Button>
          </div>
        </form>
        </Card.Body>
        </Card>
      )}
      {isPasswordValid == true && (
        <Card style={{ margin: "50px auto", width: "70%" }}>
          <Card.Body>
            <Card.Title>
              {isEditing
                ? `Editing ${notifsList[isEditing - 1].title + " "}`
                : `Add Notifications`}
            </Card.Title>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="title"
                  placeholder="Enter Notification title"
                  value={notif.title}
                  onChange={(e) =>
                    setNotif({ ...notif, title: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="enter begin date"
                  value={notif.beginDate}
                  onChange={(e) =>
                    setNotif({ ...notif, beginDate: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="enter end date"
                  value={notif.endDate}
                  onChange={(e) =>
                    setNotif({ ...notif, endDate: e.target.value })
                  }
                  required
                />
                <textarea
                  type="text"
                  placeholder="Enter Description"
                  rows="8"
                  cols="40"
                  value={notif.description}
                  onChange={(e) =>
                    setNotif({ ...notif, description: e.target.value })
                  }
                  required
                />
                <input
                  type="know more link"
                  placeholder="Enter know more link"
                  value={notif.knowMoreLink}
                  onChange={(e) =>
                    setNotif({ ...notif, knowMoreLink: e.target.value })
                  }
                  required
                />

                {!isLoading && (
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                )}
                {isEditing && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      setIsEditing(false);
                      setNotif(initialNotifState);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
            {notifsList.length > 0 && (
              <>
                <Card.Title>Added Notifications</Card.Title>
                <div style={{ display: "flex", width: "100%" }}>
                  {notifsList.map((notif, _id) => (
                    <Notifi
                      key={notif.id}
                      {...notif}
                      deleteNotif={() => handleDelete(_id)}
                      editNotif={() => handleEdit(_id)}
                    />
                  ))}
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      )}

      {/* )} */}
    </>
  );
};

export default AddNotif;
