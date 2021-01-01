import React from "react";

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
import Custom404 from "../404";
import Button from "../../src/components/Button";
const timeLast = moment().add(2, "hour").format("HH:mm");

const Conference = () => {
  const { state, conferenceDispatch } = useContext(StoreContext);
  const { authState, conferenceState } = state;
  const { all } = conferenceState;
  const { user } = authState;
  const INITIAL_STATE = {
    name: "",
    quota: 0,
    date: moment().format("2020-12-31"),
    time: timeLast,
    locationCity: "",
    attendants: [],
    createBy: { id: user._id, name: user.name },
  };
  const [isEnabled, setIsEnabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const [menuIndex, setMenuIndex] = useState(true);
  const [form, setForm] = useState(INITIAL_STATE);
  console.log("createBy.id = >", form.createBy.id);
  const userConferences = all.filter((c) => {
    console.log("iterado =>", c);
    return c.createBy.id === user._id;
  });

  const onChangeText = (target, value) => {
    setForm({ ...form, [target]: value });
  };

  const handleSubmit = async () => {
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
        time,
        date,
        createBy: { id: user._id, name: user.name },
      },
      conferenceDispatch
    );

    setForm(INITIAL_STATE);
    setMenuIndex();
  };
  const handleEdit = (item) => {
    setForm(item);
    setIsEnabled(item.isEnabled);
    setMenuIndex(true);
    setEdit(true);
  };

  const onEdit = async () => {
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

  if (user && user.role !== "speaker") {
    return <Custom404 />;
  }
  return (
    <Section>
      <div>
        <div
          style={{
            margin: "2rem 0 0.5rem 0 ",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            text={menuIndex ? "Ver mis conferencias" : "crear conferencia"}
            type={"button"}
            action={() => setMenuIndex(!menuIndex)}
          />
        </div>
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
