import { Card, Button } from "react-bootstrap";
import Image from "next/legacy/image";
import { firebaseDB as db } from "../../lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseconfig } from "../../lib/firebase";
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

const Evaluation = ({
  title,
  editEvent,
  deleteEvent,
  poster,
  knowMoreLink,
}) => {
  //   console.log(title, description, poster, beginDate, endDate);
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
        maxWidth: "500px",  
        maxHeight: "450px", 
        overflow: "auto",
      }}
    >
      <div style={{ height: "70px", width: "70px" }}>
        <Image src={poster} alt="" height={1000} width={1000} />
      </div>
      <span>{`Name: ${title}`}</span>
      <span>{`LinkedIn link: ${knowMoreLink}`}</span>
      <Button variant="danger" onClick={deleteEvent}>
        Delete
      </Button>
      <Button variant="warning" onClick={editEvent}>
        Edit
      </Button>
    </div>
  );
};

const AddEvaluation = () => {
  // const { superAdminUserName, superAdminToken, logoutSuperAdmin } = useAuth();
  // console.log(superAdminToken)
  // useEffect(() => {
  //   if (!superAdminToken) Router.replace("/adminlogin");
  // });
  function logout(e) {
    e.preventDefault();
    // logoutSuperAdmin();
  }
  const initialEventState = {
    title: "",
    poster: "",
    isActive: true,
    knowMoreLink: "",
  };
  const [event, setEvent] = useState(initialEventState);
  const [eventsList, setEvalList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    set(ref(db, `evalteam/${eventsList[id].id}`), null)
      .then(() => {
        setIsLoading(false);
        alert("Team Member deleted successfully");
      })
      .catch((error) => alert(error.message));
  };

  const handleEdit = async (id) => {
    setEvent(eventsList[id]);
    setIsEditing(id + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, title, poster, isActive, knowMoreLink } = event;
    setIsLoading(true);
    const storage = getStorage();
    const imageName = title + "_" + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `evalteam/${isEditing ? id : imageName}`
    );
    const metadata =
      typeof poster == "string" ? null : { contentType: poster.type };
    const desertRef = firebaseStorageRef(storage, `evalteam/${id}`);
    isEditing &&
      deleteObject(desertRef)
        .then(() => {
          console.log("file deleted successfully");
        })
        .catch((error) => {
          alert(error.message);
        });
    uploadBytes(storageRef, poster, metadata).then((snapshot) => {
      getDownloadURL(
        firebaseStorageRef(storage, `evalteam/${isEditing ? id : imageName}`)
      )
        .then((poster) => {
          set(ref(db, `evalteam/${isEditing ? id : imageName}`), {
            title,
            poster,
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
      setEvent(initialEventState);
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
      alert("Password does not match.");
      setPassword(password);
      setIsPasswordValid(false);
    }
  };

  useEffect(() => {
    onValue(
      ref(db, `evalteam/`),
      (snapshot) => {
        if (snapshot.exists()) {
          let events = Object.entries(snapshot.val());
          console.log(Object.entries(snapshot.val()));
          events = events.map((event) => {
            return { id: event[0], ...event[1] };
          });
          setEvalList(events);
        } else {
          console.log("No data available");
          setEvalList([]);
        }
        // setIsloading(false);
      },
      (error) => console.log(error)
    );
  }, [isLoading]);
  return (
    <>
      {isPasswordValid && (
        <Card style={{ margin: "50px auto", width: "70%" }}>
          {/* {superAdminToken && <span>{superAdminUserName}</span>} */}
          {/* <Button variant="primary" onClick={() => logout()}>
            Logout
          </Button> */}
          <Card.Body>
            <Card.Title>
              {isEditing
                ? `Editing ${eventsList[isEditing - 1].title + " "}`
                : `Add Evaluation Team Member`}
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
                  placeholder="Enter name"
                  value={event.title}
                  onChange={(e) =>
                    setEvent({ ...event, title: e.target.value })
                  }
                  required
                />

                <input
                  type="know more link"
                  placeholder="Enter LinkedIn url"
                  value={event.knowMoreLink}
                  onChange={(e) =>
                    setEvent({ ...event, knowMoreLink: e.target.value })
                  }
                  required
                />
                <div>
                  <input
                    type="file"
                    name="poster"
                    onChange={(e) =>
                      setEvent({ ...event, poster: e.target.files[0] })
                    }
                    required
                  />
                </div>
                <div style={{ width: "150px", margin: "10px auto" }}>
                  {event.poster && (
                    <Image
                      src={
                        typeof event.poster == "string"
                          ? event.poster
                          : URL.createObjectURL(event.poster)
                      }
                      alt=""
                      height="1000"
                      width="1000"
                    />
                  )}
                </div>

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
                      setEvent(initialEventState);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
            {eventsList.length > 0 && (
              <>
                <Card.Title>Added Evaluation Team</Card.Title>
                <div className="d-flex justify-content-center ">
                  <div className="row">
                  {eventsList.map((event, _id) => {
                    return (
                      <div className="col-md-4" key={event.id}>
                      <Evaluation
                      
                      {...event}
                      deleteEvent={() => handleDelete(_id)}
                      editEvent={() => handleEdit(_id)}
                    />
                    </div>
                    );
                    })};
                  
                    
                  
                </div>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      )}

      {!isPasswordValid && (
        <Card style={{ margin: "50px auto", width: "30%", height: "20%" }}>
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
                <Button
                  type="submit"
                  className="my-2"
                  onClick={handleCheckPassword}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      )}
      {/* )} */}
    </>
  );
};

export default AddEvaluation;
