import { useContext } from "react";
import { StoreContext } from "../../flux";
import { useRouter } from "next/router";
import { singOff } from "../../flux/auth/actions";

const NavBar = () => {
  const { state, authDispatch } = useContext(StoreContext);
  const { authState } = state;
  const { user } = authState;

  const router = useRouter();
  console.log("router", router.pathname);

  return (
    <nav className="navBar">
      <div className="containerLogoNav">
        <img src={"/static/assets/images/logo.png"} />
      </div>

      <div className="containerLinks">
        <a
          className={router.pathname === "/" ? "activeLink" : "link"}
          onClick={() => router.push("/")}
        >
          Explorar
        </a>

        {user && user.role === "speaker" && (
          <a
            className={
              router.pathname === "/Conference" ? "activeLink" : "link"
            }
            onClick={() => router.push("/Conference")}
          >
            Conferencia
          </a>
        )}

        <a className="link" onClick={() => singOff(authDispatch)}>
          Cerrar sesión
        </a>

        <div className="userDefault">
          <img src={"/static/assets/images/user.png"} />
          <span className="nameUser">Jesus briceño</span>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
