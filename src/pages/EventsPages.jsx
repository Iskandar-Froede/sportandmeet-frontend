import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "../Components/EventCard";
import NewEvent from "../Components/NewEvent";

const API_URL = `${process.env.REACT_APP_URL}`;

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
  const [fullEventList, setFullEventList] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (event) => {
    const inputText = event.target.value;
    //for making the seach bar look up the different sports
    setSearchText(inputText);
    setEvents(
      fullEventList.filter((event) => {
        return event.name.toLowerCase().includes(inputText.toLowerCase());
      })
    );
  };

  const getAllEvents = () => {
    axios
      .get(`${API_URL}/events`)
      .then((response) => {
        setEvents(response.data);
        setFullEventList(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="list-events">
      <h1 style={{ textDecorationLine: "underline" }}>
        All events of Sport and Meet
      </h1>
      {/* to create the seach bar */}
      <input
        onChange={handleSearchInput}
        value={searchText}
        type="text"
        placeholder="Search events"
      />

      <p>Just click on the event for more details</p>
      <br></br>

      {events.map((event) => (
        <Link className="event-link" to={`/events/${event._id}`}>
          {" "}
          {event.name}{" "}
        </Link>
      ))}
      <hr className="rounded"></hr>
      <NewEvent refreshEvents={getAllEvents} />
    </div>
  );
}

export default EventsPages;
