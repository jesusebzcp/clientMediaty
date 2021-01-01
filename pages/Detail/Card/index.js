import React from "react";

import Button from "../../../src/components/Button";
import PropTypes from "prop-types";
import Error from "../../../src/components/Error";
import moment from "moment";
import {
  editConference,
  handleError,
} from "../../../src/flux/conference/actions";
const Card = ({ conference, dispatch, user, error, errorMsn }) => {
  const {
    create,
    createBy,
    date,
    locationCity,
    name,
    quota,
    attendants,
    time,
  } = conference;

  const handleSuscribe = async () => {
    if (user._id.includes(createBy.id)) {
      handleError(
        {
          error: true,
          errorMsn: "Lo siento no puedes inscribirte en tu propio evento",
        },
        dispatch
      );
      return;
    }
    if (quota === attendants.length) {
      handleError(
        {
          error: true,
          errorMsn: "Lo el cupo ya esta lleno",
        },
        dispatch
      );
      return;
    }
    let currentConference = conference;

    currentConference.attendants = [...attendants, user._id];
    await editConference(currentConference, dispatch);
  };

  const handleUnsubscribe = async () => {
    let currentConference = conference;
    const deleteId = currentConference.attendants.filter((a) => a !== user._id);

    currentConference.attendants = deleteId;
    await editConference(currentConference, dispatch);
  };

  const suscribe = attendants.includes(user._id);
  return (
    <div>
      <div style={{ margin: "1rem 0" }}>
        <Error error={error} msn={errorMsn} />
      </div>

      <div className="cardDetail">
        <span>creado: {moment(create).format("L")}</span>
        <h2>{name}</h2>
        <div className="createBy">
          <span>Creado por: </span>
          <span> {createBy.name}</span>
        </div>
      </div>
      <div className="detailInformation">
        <span>Fecha de inicio: {moment(date).format("L")}</span>
        <span>Hora de inicio: {time}</span>
        <span>Lugar: {locationCity}</span>
        <span>Máximo de participantes: {quota}</span>
        <span>Inscritos: {attendants.length}</span>
      </div>

      <div>
        <Button
          text={suscribe ? "Describirme" : "Inscribirme"}
          style={{ width: 300 }}
          action={() => (suscribe ? handleUnsubscribe() : handleSuscribe())}
        />
      </div>
    </div>
  );
};
Card.propTypes = {
  conference: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.bool,
  errorMsn: PropTypes.string,
};
export default Card;
