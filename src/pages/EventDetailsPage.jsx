import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NewComment from "../Components/NewComment";

const API_URL = "http://localhost:5005";

function EventDetailsPage() {
  const [event, setEvent] = useState(null);

  const { Id } = useParams();
  console.log(Id);

  const getEvent = () => {
    axios
      .get(`${API_URL}/events/${Id}`)
      .then((response) => {
        const oneEvent = response.data;
        console.log(oneEvent);
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div>
      <h2>Event Details Page</h2>
      {event && (
        <>
          <h1>Event name: {event.name}</h1>
          <h3>Sport event: {event.sport}</h3>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
          <p>Number of participants: {event.participants}</p>
        </>
      )}

      <NewComment refreshEvent={getEvent} eventId={Id} />

      {event &&
        event.comment.map((comment) => (
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
