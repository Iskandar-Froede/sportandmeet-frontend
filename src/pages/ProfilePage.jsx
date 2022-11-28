import React, { useEffect } from "react";
import axios from "axios";

function Profile(props) {
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
  return (
    <div>
      <h1> Welcome{props.username} </h1>
    </div>
  );
}

export default Profile;
