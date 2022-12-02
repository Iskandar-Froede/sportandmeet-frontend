import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import userEvent from "@testing-library/user-event";
import "../Styles/Profile.css";
import { Link, useParams } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_URL}`;

function ProfilePage() {
  const { user, setUser } = useContext(SessionContext);
  const [userEvent, setUserEvent] = useState([]);

  // user can join the event
  const [event, setEvent] = useState(null);
  const { Id } = useParams();
  console.log("here come user", user);

  const handleJoin = async (eventId) => {
    console.log(eventId);
    const joinUser = await axios.get(
      `${API_URL}/events/join/${user._id}/${eventId}`
    );
    setUser(joinUser.data);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    //get the image from file input, its files with an 's' and [0] for the first one because you possibly could add multiple.
    const image = event.target.imageUrl.files[0];

    //create a new form data to send and append all the key value pairs to it
    const formData = new FormData();
    formData.append("imageUrl", image);
    console.log("here is user", user);
    // Send the formData with all the key: value pairs attached to it
    let res = await axios.post(
      `${process.env.REACT_APP_URL}/auth/upload/${user._id}`,
      formData
    );
    console.log("here is your new user", res.data);
    setUser(res.data);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");

      let verifyRes = await axios.get(
        `${process.env.REACT_APP_URL}/auth/verify`,
        {
          headers: { authorization: `Bearer ${storedToken}` },
        }
      );

      const getUserEvent = await axios.get(
        `${process.env.REACT_APP_URL}/events/user-events`,
        {
          headers: { authorization: `Bearer ${storedToken}` },
        }
      );

      console.log(getUserEvent);

      setUserEvent(getUserEvent.data.event);
      //   console.log("profile page", verifyRes.data);
    };
    verifyUser();
  }, []);

  if (!user) {
    return <p>...is Loading</p>;
  }

  console.log(user);
  return (
    <div className="profile-container">
      <h1>Welcome {user.username} to Sport and Meet </h1>

      <h3>Profile Image</h3>
      <div className="profile-img">
        {user.profileImage && <img src={user.profileImage} alt="avatar" />}

        <form onSubmit={handleUpload}>
          <input name="imageUrl" type="file" />
          <br></br>
          <button className="upload-btn">Upload Image</button>
        </form>
      </div>

      <h2 style={{ textDecorationLine: "underline" }}>
        History of your created events :{" "}
      </h2>
      <p>
        Just click on the event name if you want to have more details of the
        events or to edit your event
      </p>
      {userEvent &&
        userEvent.map((oneEvent) => {
          return (
            <Link className="event-link" to={`/events/${oneEvent._id}`}>
              {oneEvent.name}
            </Link>
          );
        })}

      <Link to="/events">
        <button className="back-btn">Click here to CREATE an event</button>
      </Link>

      <hr className="rounded-comment"></hr>
      <h2 style={{ textDecorationLine: "underline" }}>
        History of your joined events:{" "}
      </h2>
      {user.joinEvent &&
        user.joinEvent.map((event) => {
          return <p>{event.name}</p>;
        })}
    </div>
  );
}

export default ProfilePage;
