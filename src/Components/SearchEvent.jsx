import React from "react";

function SearchEvent({ handleFilter }) {
  return (
    <div>
      <input onChange={handleFilter} placeholder="Search for a event" />
    </div>
  );
}

export default SearchEvent;
