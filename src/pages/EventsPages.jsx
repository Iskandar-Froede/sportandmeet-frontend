import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "../Components/EventCard";
import NewEvent from "../Components/NewEvent";

const API_URL = "http://localhost:5005";

// import { SessionContext } from "../contexts/Session.Context";

/*
const EventsPage = () => {
  const { token, fetchWithToken } = useContext(SessionContext);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch our events from our API (backend)

  const fetchEvents = fetchWithToken("GET", "/events", setEvents);

  //Fetch our events at mounting time

  useEffect(() => {
    fetchEvents();
    setIsLoading(false);
  }, []);

  // Delete an event

  const deleteEvent = async (eventId) => {
    await fetch(`http://localhost:5005/events/${eventId}`, {
      method: "DELETE",
    });
    fetchEvents();
  };

  return (
    <div>
      <h1>My Evenst</h1>
      {token}
      <NewEvent fetchEvents={fetchEvents} />

      {events.map((event) => (
        <Events
          key={event._id}
          event={event}
          deleteEvent={deleteEvent}
          fetchEvents={fetchEvents}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
*/

function EventsPages() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
     axios
      .get(`${API_URL}/events`)
      .then((response) => {
        console.log (response.data)
        setEvents (response.data.events)})
      .catch((error) => console.log(error));
  };
  

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div>
     <NewEvent refreshEvents={getAllEvents} />
      {events && events.map((event) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}

export default EventsPages;
