import React from "react";

function NewEvent({ handleNewEvent }) {
  const [newEvent, setNewEvent] = useState({
    name: "",
    sport: "",
    date: "",
    time: "",
    location: "",
    participants: 0,
  });

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleNewEvent(e, newEvent);
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleChange}
        />
        <label>Sport:</label>
        <input
          type="checkbox"
          name="sport"
          value={newEvent.sport}
          onChange={handleChange}
        />
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
        />
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleChange}
        />
        <label>Participants:</label>
        <input
          type="number"
          name="participants"
          value={newEvent.participants}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default NewEvent;
