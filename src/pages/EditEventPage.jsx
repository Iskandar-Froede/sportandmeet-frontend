import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditEventPage(props) {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState(0);

  const { Id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${Id}`)
      .then((response) => {
        const oneEvent = response.data;
        setName(oneEvent.name);
        setSport(oneEvent.sport);
        setDate(oneEvent.date);
        setTime(oneEvent.time);
        setLocation(oneEvent.location);
        setParticipants(0);
      })
      .catch((error) => console.log(error));
  }, [Id]);

  return (
    <div>
      <h1>Edit Event</h1>
      <form>
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditEventPage;
