import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import userEvent from "@testing-library/user-event";

function ProfilePage() {
  const { user } = useContext(SessionContext);
  const [userEvent, setUserEvent] = useState([]);

  const handleUpload = async (event) => {
    event.preventDefault();
    //get the image from file input, its files with an 's' and [0] for the first one because you possibly could add multiple.
    const image = event.target.imageUrl.files[0];

    //create a new form data to send and append all the key value pairs to it
    const formData = new FormData();
    formData.append("imageUrl", image);

    // Send the formData with all the key: value pairs attached to it
    let res = await axios.post("http://localhost:5005/auth/upload", formData);
    console.log("here is your new user", res.data);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");
      let verifyRes = await axios.get(`http://localhost:5005/auth/verify`, {
        headers: { authorization: `Bearer ${storedToken}` },
      });
      const getUserEvent = await axios.get(
        `http://localhost:5005/events/user-events`,
        {
          headers: { authorization: `Bearer ${storedToken}` },
        }
      );

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
    <div>
      <h1>Welcome {user.username} </h1>
      <form onSubmit={handleUpload}>
        <input className="avatar" name="imageUrl" type="file" />
        <button>Upload Image</button>
      </form>
      <h2>Your events: </h2>
      {userEvent &&
        userEvent.map((oneEvent) => {
          return <h3>{oneEvent.name}</h3>;
        })}
    </div>
  );
}

export default ProfilePage;
