import React from "react";
import PropTypes from "prop-types";

const ItemConference = ({ conference, action, style }) => {
  const { name, time, attendants, locationCity } = conference;
  console.log("conference =>", conference);

  return (
    <div className="card" style={style ? style : {}}>
      <div className="hour">
        <span>{time ? time : "12:00"}</span>
      </div>
      <div className="event">
        <h3 className="location">{locationCity ? locationCity : "Bogota"}</h3>
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
  style: PropTypes.object,
};

export default ItemConference;
