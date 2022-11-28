import React from "react";
import { Link } from "react-router-dom";

function EventCard({ name, sport, date, time, location, participants, _id }) {
  return (
    <div>
      <Link to={`/events/${_id}`}>
        <h3>{name}</h3>
        <p>{sport}</p>
        <p>{date}</p>
        <p>{time}</p>
        <p>{location}</p>
        <p>{participants}</p>
      </Link>
    </div>
  );
}

export default EventCard;
