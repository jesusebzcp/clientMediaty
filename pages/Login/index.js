import React, { useState, useContext } from "react";
import Lottie from "react-lottie";
import { StoreContext } from "../../src/flux";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import Loading from "../../src/components/Loading";
import { IMG_HERO } from "../../src/constants";
import {
  handleError,
  loginDispatch,
  registryDispatch,
} from "../../src/flux/auth/actions";
import Error from "../../src/components/Error";
import { useRouter } from "next/router";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: IMG_HERO,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const { state, authDispatch } = useContext(StoreContext);
  const { authState } = state;
  const { loading, error, errorMsn } = authState;

  const [login, setLogin] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);
  const [role, setRole] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;
    if (login) {
      if (password === "" || email === " ") {
        return handleError(
          { error: true, errorMsn: "Todos los campos son necesarios" },
          authDispatch
        );
      }
      if (password.length < 6) {
        return handleError(
          {
            error: true,
            errorMsn: "La contraseña debe contener al menos 6 caracteres",
          },
          authDispatch
        );
      }
      await loginDispatch({ email, password }, authDispatch);
      setForm(INITIAL_STATE);
      router.push("/");

      return;
    } else {
      if (name === "" || password === "" || email === " ") {
        return handleError(
          { error: true, errorMsn: "Todos los campos son necesarios" },
          authDispatch
        );
      }
      if (password.length < 6) {
        return handleError(
          {
            error: true,
            errorMsn: "La contraseña debe contener al menos 6 caracteres",
          },
          authDispatch
        );
      }
    }

    await registryDispatch(
      {
        name,
        email,
        password,
        role: role ? "speaker" : "attendant",
      },
      authDispatch
    );

    setForm(INITIAL_STATE);
    router.push("/");
  };

  const onChangeText = (target, value) => {
    setForm({ ...form, [target]: value });
  };

  return (
    <div className="containerLogin">
      <div className="containerImg">
        <h1>Mediaty</h1>
        <h3>
          Marketing Simple. Marketing de Impacto. Marketing de Resultados.
        </h3>
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
      <div className="containerForm">
        <form onSubmit={handleAuth} className="formLogin">
          <Error error={error} msn={errorMsn} />
          <div className="logo">
            <img src={"/static/assets/images/logo.png"} />
            <span>Conferencia</span>
          </div>

          {!login && (
            <Input
              placeholder={"Ingresa tu nombre"}
              value={form.name}
              onChange={onChangeText}
              name={"name"}
              type={"text"}
            />
          )}
          <Input
            placeholder={"Ingresa tu email"}
            value={form.email}
            onChange={onChangeText}
            name={"email"}
            type={"email"}
            style={{ margin: "1rem 0" }}
          />
          <Input
            placeholder={"Ingresa tu contraseña"}
            value={form.password}
            onChange={onChangeText}
            name={"password"}
            type={"password"}
          />
          {!login && (
            <div className="check">
              <input
                type="checkbox"
                checked={role}
                onChange={() => setRole(!role)}
              />
              <span className="textCheckBox">
                {"Soy Speaker (conferencista)"}
              </span>
            </div>
          )}
          <Button
            text={login ? "iniciar sesión" : "Registrarme"}
            type={"submit"}
            style={{ margin: "1rem 0rem" }}
          />

          <button
            className="underlineBtn"
            type={"button"}
            onClick={() => setLogin(!login)}
          >
            {login ? "No tengo cuenta" : "Ya tengo cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
