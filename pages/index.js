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
    fontSize: "2rem",
    fontWeight: 700,
    color: "#051145",
    transition: "all 0.3s ease-in",
  };
  const menuItem = {
    color: "#333233",
    cursor: "pointer",
    fontWeight: 700,
  };

  useEffect(() => {
    getConferences(conferenceDispatch);
  }, []);
  return (
    <Section>
      <Hero
        title={"Brindamos soluciones, para que escuches tu tema preferido"}
      />

      <div>
        <div className="menuIndex">
          <span
            style={!menuIndex ? activeMenuItem : activeMenuItem}
            onClick={() => setMenuIndex(!menuIndex)}
          >
            {!menuIndex ? "Listas de conferencia" : "Inscritos"}
          </span>
          <span
            style={menuIndex ? menuItem : menuItem}
            onClick={() => setMenuIndex(!menuIndex)}
          >
            {!menuIndex ? "Inscritos" : "Listas de conferencia"}
          </span>
        </div>

        <div className="containerItems" id="containerItems">
          {!menuIndex && filterEnabled && filterEnabled.length > 0
            ? filterEnabled.map((conference, index) => {
                return (
                  <ItemConference
                    key={index}
                    conference={conference}
                    action={() => handleDetail(conference)}
                  />
                );
              })
            : "No tienes conferencia"}{" "}
          {menuIndex &&
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
