import React from "react";
import { useState } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import { useContext } from "react";
const API_URL = "http://localhost:5005";

function NewComment(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(SessionContext);

  const requestBody = { title, description, userId: user._id };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/events/comments/${props.eventId}`, requestBody)
      .then((response) => {
        console.log(response.data);
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");

        // Invoke the callback function coming through the props

        props.refreshEvent();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Add a new comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title :
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description :
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
          />
        </label>

        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
export default NewComment;
