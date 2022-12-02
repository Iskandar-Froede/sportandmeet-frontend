import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NewComment from "../Components/NewComment";
import "../Styles/events.css";
import { SessionContext } from "../contexts/Session.Context";

const API_URL = `${process.env.REACT_APP_URL}`;

function EventDetailsPage() {
  const [event, setEvent] = useState(null);

  const { user, setUser } = useContext(SessionContext);

  const { Id } = useParams();
  console.log("here come user", user);

  const handleJoin = async (eventId) => {
    console.log(eventId);
    const joinUser = await axios.get(
      `${API_URL}/events/join/${user._id}/${eventId}`
    );
    setUser(joinUser.data);
  };

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
    <div className="details-container">
      <h1 style={{ textDecorationLine: "underline" }}>Event Information</h1>
      {event && (
        <>
          <h2>Event name: {event.name}</h2>
          <p>Sport event: {event.sport}</p>
          <p>Date: {event.date?.toString().split("T")[0]}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
          <p>Number of participants: {event.participants}</p>
        </>
      )}

      <Link to={`/events/edit/${Id}`}>
        <button>Edit Event</button>
      </Link>

      <button
        type="button"
        onClick={() => {
          handleJoin(event._id);
        }}
      >
        Join Event
      </button>
      <hr className="rounded-comment"></hr>
      <h2>History of your joined events: </h2>
      {user.joinEvent &&
        user.joinEvent.map((event) => {
          return <p>{event.name}</p>;
        })}

      <hr className="rounded-comment"></hr>
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
        <button className="back-btn">Back to events</button>
      </Link>
    </div>
  );
}

export default EventDetailsPage;
