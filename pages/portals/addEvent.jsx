import { Card, Button } from "react-bootstrap";
import Image from "next/legacy/image";
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

const Event = ({
  title,
  editEvent,
  deleteEvent,
  description,
  poster,
  beginDate,
  endDate,
  registrationLink,
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
      <span>{`Title: ${title}`}</span>
      <p>{`Description: ${description}`}</p>
      <span>{`BeginDate: ${beginDate}`}</span>
      <span>{`End Date: ${endDate}`}</span>
      <span>{`Registration link: ${registrationLink}`}</span>
      <span>{`Know More link: ${knowMoreLink}`}</span>
      <Button variant="danger" onClick={deleteEvent}>
        Delete
      </Button>
      <Button variant="warning" onClick={editEvent}>
        Edit
      </Button>
    </div>
  );
};

const AddEvent = () => {
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
    description: "",
    beginDate: "",
    endDate: "",
    isActive: true,
    registrationLink: "",
    knowMoreLink: "",
  };
  const [event, setEvent] = useState(initialEventState);
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    set(ref(db, `events/${eventsList[id].id}`), null)
      .then(() => {
        setIsLoading(false);
        alert("Event deleted successfully");
      })
      .catch((error) => alert(error.message));
  };

  const handleEdit = async (id) => {
    setEvent(eventsList[id]);
    setIsEditing(id + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      title,
      poster,
      description,
      beginDate,
      endDate,
      isActive,
      registrationLink,
      knowMoreLink,
    } = event;
    setIsLoading(true);
    const storage = getStorage();
    const imageName = title + "_" + beginDate + "_" + endDate + "_" + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `events/${isEditing ? id : imageName}`
    );
    const metadata =
      typeof poster == "string" ? null : { contentType: poster.type };
    const desertRef = firebaseStorageRef(storage, `events/${id}`);
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
        firebaseStorageRef(storage, `events/${isEditing ? id : imageName}`)
      )
        .then((poster) => {
          set(ref(db, `events/${isEditing ? id : imageName}`), {
            title,
            description,
            poster,
            description,
            beginDate,
            endDate,
            isActive,
            registrationLink,
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
      ref(db, `events/`),
      (snapshot) => {
        if (snapshot.exists()) {
          let events = Object.entries(snapshot.val());
          //   console.log(Object.entries(snapshot.val()));
          events = events.map((event) => {
            return { id: event[0], ...event[1] };
          });
          setEventsList(events);
        } else {
          console.log("No data available");
          setEventsList([]);
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
              ? `Editing ${
                  eventsList[isEditing - 1].title +
                  " " +
                  eventsList[isEditing - 1].beginDate +
                  "- " +
                  eventsList[isEditing - 1].endDate +
                  " ..."
                }`
              : `Add Event`}
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
                placeholder="Enter event title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
              />
              <textarea
                type="text"
                placeholder="Enter Description"
                rows="8"
                cols="40"
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
                required
              />
              <input
                type="date"
                placeholder="enter begin date"
                value={event.beginDate}
                onChange={(e) =>
                  setEvent({ ...event, beginDate: e.target.value })
                }
                required
              />
              <input
                type="date"
                placeholder="enter end date"
                value={event.endDate}
                onChange={(e) =>
                  setEvent({ ...event, endDate: e.target.value })
                }
                required
              />
              <input
                type="know more link"
                placeholder="Enter know more link"
                value={event.knowMoreLink}
                onChange={(e) =>
                  setEvent({ ...event, knowMoreLink: e.target.value })
                }
                required
              />
              <input
                type="registration link"
                placeholder="Enter registration link"
                value={event.registrationLink}
                onChange={(e) =>
                  setEvent({ ...event, registrationLink: e.target.value })
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
              <Card.Title>Added Events</Card.Title>
              <div style={{ display: "flex", width: "100%" }}>
                {eventsList.map((event, _id) => (
                  <Event
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

export default AddEvent;
