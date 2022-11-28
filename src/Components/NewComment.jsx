import React from "react";
import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function NewComment(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState("");

  const { id } = props;
  const requestBody = { title, description, id };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/events`, requestBody)
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
        setCreated("");

        // Invoke the callback function coming through the props
        // from the ProjectDetailsPage, to refresh the project details
        props.refreshProject();
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
