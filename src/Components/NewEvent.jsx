import React, { useState } from "react";

function NewEvent({ fetchEvents }) {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5005/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, sport, date, time, location, participants }),
    });
    setName("");
    setSport("");
    setDate("");
    setTime("");
    setLocation("");
    setParticipants(0);
    fetchEvents();
  };

  return (
    <div>
      <h2>Add a new event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name :
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Sport :
          <input
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
            type="time"
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

        <button>Add Event</button>
      </form>
    </div>
  );
}
export default NewEvent;
