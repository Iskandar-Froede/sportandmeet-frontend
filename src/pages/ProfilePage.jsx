import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import userEvent from "@testing-library/user-event";
import "../Styles/Profile.css";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user, setUser } = useContext(SessionContext);
  const [userEvent, setUserEvent] = useState([]);

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

      <h2>Your events : </h2>
      <p>Just click on the event name if you want to edit your event</p>
      {userEvent &&
        userEvent.map((oneEvent) => {
          return (
            <Link className="event-link" to={`/events/${oneEvent._id}`}>
              {oneEvent.name}
            </Link>
          );
        })}
      <Link to="/events">
        <button className="back-btn">
          Click here to add an event or check all events
        </button>
      </Link>
    </div>
  );
}

export default ProfilePage;
