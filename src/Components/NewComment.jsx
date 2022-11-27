import React from "react";
import { useState } from "react";

const NewComment = ({ fetchComments }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created, setCreated] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, created }),
    });
    setTitle("");
    setDescription("");
    setCreated("");
    fetchComments();
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
        <label>
          Created :
          <input
            value={created}
            onChange={(event) => setCreated(event.target.value)}
            type="date"
          />
        </label>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default NewComment;
