import { useRouter } from "next/router";
import Section from "../src/components/Section";
import Hero from "../src/components/Hero";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../src/flux";
import { getConferences } from "../src/flux/conference/actions";
import ItemConference from "../src/components/itemConference";

export default function Home() {
  const router = useRouter();
  const { state, conferenceDispatch } = useContext(StoreContext);
  const { authState, conferenceState } = state;
  const { all } = conferenceState;
  const { user } = authState;
  const [menuIndex, setMenuIndex] = useState(0);
  const filterUser = all.filter((c) => c.attendants.includes(user._id));
  const filterEnabled = all.filter((c) => c.isEnabled === true);

  const handleDetail = (item) => {
    console.log("conferencia", item);

    router.push({
      pathname: "/Detail",
      query: { id: item._id },
    });
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

  useEffect(() => {
    getConferences(conferenceDispatch);
  }, []);
  return (
    <Section>
      <Hero title={"Bienvenido"} />

      <div>
        <div className="menuIndex">
          <span
            style={menuIndex === 0 ? activeMenuItem : menuItem}
            onClick={() => setMenuIndex(0)}
          >
            Listas de conferencia
          </span>
          <span
            style={menuIndex === 1 ? activeMenuItem : menuItem}
            onClick={() => setMenuIndex(1)}
          >
            Inscritos
          </span>
        </div>

        <div className="containerItems">
          {menuIndex === 0 &&
            filterEnabled &&
            filterEnabled.length > 0 &&
            filterEnabled.map((conference, index) => {
              return (
                <ItemConference
                  key={index}
                  conference={conference}
                  action={() => handleDetail(conference)}
                />
              );
            })}{" "}
          {menuIndex === 1 &&
            filterUser &&
            filterUser.length > 0 &&
            filterUser.map((conference, index) => {
              return (
                <ItemConference
                  key={index}
                  conference={conference}
                  action={() => handleDetail(conference)}
                />
              );
            })}
        </div>
      </div>
    </Section>
  );
}
