import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import userEvent from "@testing-library/user-event";

function ProfilePage() {
  const { user } = useContext(SessionContext);
  const [userEvent, setUserEvent] = useState([]);

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

  return (
    <div>
      <h1>Welcome {user.username} </h1>
      <h2>Your events: </h2>
      {userEvent &&
        userEvent.map((oneEvent) => {
          return <h3>{oneEvent.name}</h3>;
        })}
    </div>
  );
}

export default ProfilePage;
