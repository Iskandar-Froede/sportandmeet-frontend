import React, { useState, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../contexts/Session.Context";
import '../Styles/events.css';

const API_URL = "http://localhost:5005";

function NewEvent(props) {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState(0);

  const { user } = useContext(SessionContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("here user from contex", user);

    const requestBody = {
      name,
      sport,
      date,
      time,
      location,
      participants,
      userId: user._id,
    };
    axios
      .post(`${API_URL}/events`, requestBody)
      .then((response) => {
        // Reset the state
        setName("");
        setSport("");
        setDate("");
        setTime("");
        setLocation("");
        setParticipants(0);

        props.refreshEvents();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Add a new event</h2>
      <form onSubmit={handleSubmit} className="events-form">
        <label>
          Name :
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Sport :
          <input
            type="text"
            value={sport}
            onChange={(event) => setSport(event.target.value)}
          />
        </label>
        <label>
          Date :
          <input
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <label>
          Time :
          <input
            value={time}
            type="time"
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        <label>
          Location :
          <input
            value={location}
            type="text"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label>
          Number of Participants :
          <input
            value={participants}
            type="number"
            onChange={(event) => setParticipants(event.target.value)}
          />
        </label>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}
export default NewEvent;
