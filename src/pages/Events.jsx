import { useContext, useEffect, useState } from "react";

function Events() {
  const { token, fetchWithToken } = useContext(SessionContext);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = fetchWithToken("GET", "/events", setEvents);

  useEffect(() => {
    fetchEvents();
    setIsLoading(false);
  }, []);

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
      <NewComment fetchEvents={fetchEvents} />

      {events.map((event) => (
        <Event
          key={event._id}
          event={event}
          deleteEvent={deleteEvent}
          fetchEvents={fetchEvents}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default Events;
