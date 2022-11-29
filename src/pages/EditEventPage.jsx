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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${Id}`)
      .then((response) => {
        console.log(response.data);
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const requestBody = { name, sport, date, time, location, participants };

    axios.put(`${API_URL}/events/${Id}`, requestBody).then((response) => {
      // Once the request is resolved successfully and the project
      // is updated we navigate back to the details page
      navigate(`/events/${Id}`);
    });
  };

  const deleteEvent = (event) => {
    event.preventDefault();

    axios
      .delete(`${API_URL}/events/${Id}`)
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/events");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Edit The Event</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Event name :
          <input
            type="text"
            value={name}
            placeholer={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Sport events :
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
          Number of participants :
          <input
            value={participants}
            type="number"
            onChange={(event) => setParticipants(event.target.value)}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteEvent} style={{backgroundColor: 'red'}}>Delete</button>
    </div>
  );
}

export default EditEventPage;
