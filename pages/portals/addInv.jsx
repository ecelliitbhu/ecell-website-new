// newone
import { Card, Button } from "react-bootstrap";
import Image from "next/image";
import { firebaseDB as db } from "../../lib/firebase";
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

  const handleDelete = async (id) => {
    setIsLoading(true);
    set(ref(db, `invteam/${eventsList[id].id}`), null)
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
      `invteam/${isEditing ? id : imageName}`
    );
    const metadata =
      typeof poster == "string" ? null : { contentType: poster.type };
    const desertRef = firebaseStorageRef(storage, `invteam/${id}`);
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
        firebaseStorageRef(storage, `invteam/${isEditing ? id : imageName}`)
      )
        .then((poster) => {
          set(ref(db, `invteam/${isEditing ? id : imageName}`), {
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

  useEffect(() => {
    onValue(
      ref(db, `invteam/`),
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
      {/* {superAdminToken && ( */}
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
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
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
              <div style={{ display: "flex", width: "100%" }}>
                {eventsList.map((event, _id) => (

                  <Evaluation
                    key={event.id}
                    {...event}
                    deleteEvent={() => handleDelete(_id)}
                    editEvent={() => handleEdit(_id)}
                  />
                ))}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
      {/* )} */}
    </>

  );
};


export default AddEvaluation;
