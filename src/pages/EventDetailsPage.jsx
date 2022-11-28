import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NewComment from "../Components/NewComment";

const API_URL = "http://localhost:5005";

function EventDetailsPage(props) {
  const [event, setEvent] = useState(null);

  const { Id } = useParams();

  const getEvent = () => {
    axios
      .get(`${API_URL}/events/${Id}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <h2>EventDetailsPage</h2>
      {event && (
        <>
          <h1>{event.name}</h1>
          <p>{event.sport}</p>
          <p>{event.date}</p>
          <p>{event.time}</p>
          <p>{event.location}</p>
          <p>{event.participants}</p>
          <p>{event.comment}</p>
        </>
      )}

      <NewComment refreshEvent={getEvent} eventId={Id} />

      {event &&
        event.tasks.map((comment) => (
          <li key={comment._id}>
            <h3>{comment.title}</h3>
            <h4>Description:</h4>
            <p>{comment.description}</p>
            <p>{comment.created}</p>
          </li>
        ))}

      <Link to="/events">
        <button>Back to events</button>
      </Link>

      <Link to={`/events/edit/${Id}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
}

export default EventDetailsPage;
