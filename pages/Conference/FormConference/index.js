import React from "react";

import Button from "../../../src/components/Button";
import Error from "../../../src/components/Error";
import Input from "../../../src/components/Input";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StoreContext } from "../../../src/flux";
import moment from "moment";
import ItemConference from "../../../src/components/itemConference";

const FormConference = ({
  onChangeText,
  form,
  submit,
  setIsEnabled,
  isEnabled,
  edit,
  onEdit,
}) => {
  const { state } = useContext(StoreContext);
  const { conferenceState } = state;
  const { error, errorMsn } = conferenceState;

  return (
    <div className="formConference">
      <form className="formC">
        <Input
          label={true}
          placeholder={"Nombre de la conferencia"}
          onChange={onChangeText}
          value={form.name}
          name={"name"}
        />
        <Input
          label={true}
          placeholder={"Cuota de invitados"}
          type={"number"}
          onChange={onChangeText}
          value={form.quota}
          name={"quota"}
        />
        <Input
          label={true}
          placeholder={"Lugar (Locación)"}
          onChange={onChangeText}
          value={form.locationCity}
          name={"locationCity"}
        />
        <Input
          label={true}
          placeholder={"Fecha de inicio"}
          type={"date"}
          onChange={onChangeText}
          value={moment(form.date).format("2020-12-31")}
          name={"date"}
        />
        <Input
          label={true}
          placeholder={"Hora de inicio"}
          type={"time"}
          onChange={onChangeText}
          value={form.time}
          name={"time"}
        />
      </form>
      <div className="contItemForm">
        <Error error={error} msn={errorMsn} />

        <span>Presentación</span>
        <ItemConference
          action={() => console.log(form)}
          conference={form}
          style={{ background: "rgb(235, 235, 235)" }}
        />
        <div className="checkConference">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <span className="textCheckBox">{"Marcar como disponible"}</span>
        </div>
        <Button
          action={() => {
            edit ? onEdit() : submit();
          }}
          type="button"
          text={edit ? "Guardar cambios" : "Crear conferencia"}
          style={{ width: 400, margin: "1rem 0" }}
        />
      </div>
    </div>
  );
};
FormConference.propTypes = {
  onChangeText: PropTypes.func,
  setForm: PropTypes.func,
  submit: PropTypes.func,
  form: PropTypes.object,
  setIsEnabled: PropTypes.func,
  isEnabled: PropTypes.bool,
  edit: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default FormConference;
