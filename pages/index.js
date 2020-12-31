import Hero from "../src/components/Hero";

export default function Home() {
  return (
    <div>
      <div className="containerHero">
        <div style={{ flex: 1 }} />
        <Hero title={"Encuentra tu proxima conferencia"} />
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
