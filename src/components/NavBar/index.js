import { useContext } from "react";
import { StoreContext } from "../../flux";
import { useRouter } from "next/router";

const NavBar = () => {
  const { state } = useContext(StoreContext);
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
          className={router.pathname === "/" && "activeLink"}
          onClick={() => router.push("/")}
        >
          Home
        </a>

        {user && user.role === "speaker" && (
          <a
            className={router.pathname === "/Conference" && "activeLink"}
            onClick={() => router.push("/Conference")}
          >
            Conferencia
          </a>
        )}
        <a
          className={router.pathname === "/Profile" && "activeLink"}
          onClick={() => router.push("/Profile")}
        >
          Perfil
        </a>
        <a>Cerrar sesión</a>

        <div className="userDefault">
          <img src={"/static/assets/images/user.png"} />
          <span>Jesus briceño</span>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
