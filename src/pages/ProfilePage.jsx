import React, { useEffect, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";

function ProfilePage() {
  const { user } = useContext(SessionContext);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");
      let verifyRes = await axios.get(`http://localhost:5005/auth/verify`, {
        headers: { authorization: `Bearer ${storedToken}` },
      });
      console.log("profile page", verifyRes.data);
    };
    verifyUser();
  }, []);

  if (!user) {
    return <p>...is Loading</p>;
  }

  console.log (user)
  return (
    <div>
      <h1>WElcome {user.username} </h1>
    </div>
  );
}

export default ProfilePage;
