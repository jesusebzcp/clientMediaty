import React from "react";
import PropTypes from "prop-types";

const ItemConference = ({ conference, action }) => {
  const { name, time, attendants, locationCity } = conference;
  return (
    <div className="card">
      <div className="hour">
        <span>{time}</span>
      </div>
      <div className="event">
        <h3 className="location">{locationCity}</h3>
        <h3 className="title" onClick={() => action()}>
          {name}
        </h3>
        <h3 className="members">{attendants.length} participantes</h3>
      </div>
    </div>
  );
};

ItemConference.propTypes = {
  conference: PropTypes.object,
  action: PropTypes.func,
};

export default ItemConference;
