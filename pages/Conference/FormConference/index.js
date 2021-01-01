import Button from "../../../src/components/Button";
import Error from "../../../src/components/Error";
import Input from "../../../src/components/Input";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StoreContext } from "../../../src/flux";
import moment from "moment";

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

  console.log("form.date =>", form.date);
  return (
    <form className="formConference" onSubmit={edit ? onEdit : submit}>
      <Error error={error} msn={errorMsn} />
      <Input
        label={true}
        placeholder={"Nombre de la conferencia"}
        onChange={onChangeText}
        value={form.name}
        name={"name"}
      />
      <Input
        placeholder={"Cuota de invitados"}
        type={"number"}
        onChange={onChangeText}
        value={form.quota}
        name={"quota"}
      />
      <Input
        placeholder={"Lugar (Locación)"}
        onChange={onChangeText}
        value={form.locationCity}
        name={"locationCity"}
      />
      <Input
        placeholder={"Fecha de inicio"}
        type={"date"}
        onChange={onChangeText}
        value={moment(form.date).format("2020-12-31")}
        name={"date"}
      />
      <Input
        placeholder={"Hora de inicio"}
        type={"time"}
        onChange={onChangeText}
        value={form.time}
        name={"time"}
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
        type="submit"
        text={edit ? "Guardar cambios" : "Crear conferencia"}
        style={{ width: 300 }}
      />
    </form>
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
