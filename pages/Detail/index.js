import { useRouter } from "next/router";
import { useContext } from "react";
import Section from "../../src/components/Section";
import { StoreContext } from "../../src/flux";
import Custom404 from "../404";
import Card from "./Card";

const Detail = () => {
  const { state, conferenceDispatch } = useContext(StoreContext);
  const { authState, conferenceState } = state;
  const { all, error, errorMsn } = conferenceState;
  const { user } = authState;
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const conference = all.filter((c) => c._id === id)[0];

  return (
    <Section>
      <div>
        {conference ? (
          <Card
            conference={conference}
            dispatch={conferenceDispatch}
            user={user}
            error={error}
            errorMsn={errorMsn}
          />
        ) : (
          <Custom404 />
        )}
      </div>
    </Section>
  );
};
export default Detail;
