import Hero from "../../src/components/Hero";
import FormConference from "./FormConference";
import Section from "../../src/components/Section";
import { useContext, useEffect, useState } from "react";
import {
  createConference,
  getConferences,
  handleError,
  editConference,
} from "../../src/flux/conference/actions";
import { StoreContext } from "../../src/flux";

import moment from "moment";
import ItemConference from "../../src/components/itemConference";
const timeLast = moment().add(2, "hour").format("HH:mm");

const INITIAL_STATE = {
  name: "",
  quota: 0,
  date: moment().format("2020-12-31"),
  time: timeLast,
  locationCity: "",
};

const activeMenuItem = {
  fontSize: "1.2rem",
  color: "#000",
  textDecoration: "underline",
  transition: "all 0.3s ease-in",
};
const menuItem = {
  color: "#333233",
  cursor: "pointer",
};

const Conference = () => {
  const { state, conferenceDispatch } = useContext(StoreContext);
  const { authState, conferenceState } = state;
  const { all } = conferenceState;
  const { user } = authState;
  const [form, setForm] = useState(INITIAL_STATE);
  const [isEnabled, setIsEnabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [menuIndex, setMenuIndex] = useState(false);
  const userConferences = all.filter((c) => c.createBy.id === user._id);

  const onChangeText = (target, value) => {
    setForm({ ...form, [target]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, quota, time, date, locationCity } = form;
    if (name === "") {
      handleError(
        { error: true, errorMsn: " El nombre el obligatorio" },
        conferenceDispatch
      );
      return;
    }
    if (locationCity === "") {
      handleError(
        { error: true, errorMsn: " El locación es obligatoria" },
        conferenceDispatch
      );
      return;
    }
    if (quota < 5) {
      handleError(
        {
          error: true,
          errorMsn: "La cuota de invitados debe tener al menos 5 invitados",
        },
        conferenceDispatch
      );
      return;
    }

    await createConference(
      {
        name,
        quota,
        isEnabled,
        locationCity,
        createBy: { id: user._id, name: user.name },
        time,
        date,
      },
      conferenceDispatch
    );
    setForm(INITIAL_STATE);
  };
  const handleEdit = (item) => {
    setForm(item);
    setIsEnabled(item.isEnabled);
    setMenuIndex(1);
    setEdit(true);
  };
  const handleMenu = () => {
    if (edit) {
      if (menuIndex) {
        setEdit(false);
        setForm(INITIAL_STATE);
        setMenuIndex(!menuIndex);
        return;
      }
    }
    setMenuIndex(!menuIndex);
  };
  const onEdit = async (e) => {
    e.preventDefault();

    if (form.attendants.length > 0) {
      handleError(
        {
          error: true,
          errorMsn:
            "No puede deshabilitar la conferencia si ya posee invitados",
        },
        conferenceDispatch
      );
      return;
    }
    const { name, quota, time, date, locationCity } = form;
    if (name === "") {
      handleError(
        { error: true, errorMsn: " El nombre el obligatorio" },
        conferenceDispatch
      );
      return;
    }
    if (locationCity === "") {
      handleError(
        { error: true, errorMsn: " El locación es obligatoria" },
        conferenceDispatch
      );
      return;
    }
    if (quota < 5) {
      handleError(
        {
          error: true,
          errorMsn: "La cuota de invitados debe tener al menos 5 invitados",
        },
        conferenceDispatch
      );
      return;
    }

    let conferenceEdit = form;
    conferenceEdit.isEnabled = isEnabled;
    conferenceEdit.time = time;
    conferenceEdit.date = date;

    await editConference(conferenceEdit, conferenceDispatch);
    await getConferences(conferenceDispatch);

    setEdit(false);
    setForm(INITIAL_STATE);
    setMenuIndex(!menuIndex);
  };

  useEffect(() => {
    getConferences(conferenceDispatch);
  }, []);
  return (
    <Section>
      <div className="menuIndex">
        <span
          style={!menuIndex ? activeMenuItem : menuItem}
          onClick={() => handleMenu()}
        >
          Mis conferencias
        </span>
        <span
          style={menuIndex ? activeMenuItem : menuItem}
          onClick={() => handleMenu()}
        >
          {edit ? "Editar conferencia" : " Crear conferencia"}
        </span>
      </div>
      {!menuIndex &&
        userConferences &&
        userConferences.length > 0 &&
        userConferences.map((conference, index) => {
          return (
            <ItemConference
              key={index}
              conference={conference}
              action={() => handleEdit(conference)}
            />
          );
        })}

      {menuIndex && (
        <div className="meConferences">
          <FormConference
            form={form}
            onChangeText={onChangeText}
            submit={handleSubmit}
            setIsEnabled={setIsEnabled}
            isEnabled={isEnabled}
            edit={edit}
            onEdit={onEdit}
          />
        </div>
      )}
    </Section>
  );
};

export default Conference;
