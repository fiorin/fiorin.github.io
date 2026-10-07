import type { CSSProperties } from "react";
import ProjectList from "../components/ProjectList";
import Seo from "../components/Seo";
import games from "../data/games";

const abouts = [
  { id: "aboutDesign", side: "abilityLeft", title: "design.exe", subtitle: "Built for the table", image: "gamedev.png", body: ["Board games are systems you can hold: every card, die and turn is a mechanic you can touch.", "From the first sketch to a ruleset that survives a full night of playtesting."], tags: "Boardgame GameDesign Playtest" },
  { id: "aboutPrint", side: "abilityRight", title: "print x,y,z", subtitle: "From Blender meshes to the tabletop", image: "3dmodel.png", body: ["Miniatures, inserts and terrain — modelling and 3D printing for physical games.", "Prototyping components at home before committing to a print run."], tags: "Blender 3dPrinter Miniatures" },
  { id: "aboutTools", side: "abilityLeft", title: "python + ai", subtitle: "The tools behind the games", image: "ai.png", body: ["Balancing spreadsheets, generators and AI-assisted pipelines that feed content into the studio.", "The same automation discipline as the day job, pointed at dice instead of dashboards."], tags: "Python AI Tools" },
];

type AboutItem = { id: string; side: string; title: string; subtitle: string; image: string; body: string[]; tags: string };
const Tags = ({ value }: { value: string }) => <p className="abilitieTags">{value.split(" ").map((tag) => <span className="projectTag" key={tag}>#{tag}</span>)}</p>;
const inlineStyle = (value: string): CSSProperties => Object.fromEntries(value.split(";").filter(Boolean).map((rule) => rule.split(":").map((part) => part.trim()))) as CSSProperties;

function About({ item }: { item: AboutItem }) {
  return <section id={item.id} className={item.side}><div className="abilityContainer clearfix">
    <div className="abilityContent"><h3 className="abilityTitle">{item.title}</h3><h4 className="abilitySubtitle">{item.subtitle}</h4>
      {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p></p>
      <Tags value={item.tags} />
    </div><div className="abilityPreview"><div className="abilityPreviewContent"><img src={`/img/${item.image}`} alt={item.title} width={300} height={225} loading="lazy" className="abilityImage" /></div></div>
  </div></section>;
}

function StudioPage() {
  return <><Seo title="Fiorin Games Studio — Board game studio" description="Fiorin Games Studio designs board games and builds the tools and prototypes behind them." canonical="https://fior.in/games" /><div id="page" className="studioTheme position-relative margin-auto"><nav id="menu" aria-label="Main navigation"><p className="menuTitle">Menu</p><ul id="menuList"><li className="menuItem"><a href="#studio">The studio</a></li><li className="menuItem"><a href="#games">Games</a></li><li className="menuItem"><a href="#contact">Contact</a></li></ul></nav>
    <div className="all"><header id="logo"><h1 className="logo" title="Fiorin Games Studio"><a href="/"><img src="/img/studio.png" alt="Fiorin Games Studio" width="62" height="64" /></a></h1></header><div className="bgHeaderBottom clearfix">
      <section id="who"><section id="welcome" className="text-center"><div id="welcomeFirstLine"><span id="welcomeFiorin">Fiorin</span> <span id="welcomeHi">Games</span>  </div><div className="welcomeSecondLine"><span id="welcomeIcan">Hello my friend,</span> <span id="welcomeMuchMore"> stay a while and listen</span></div></section>
        <section id="characterSlider" className="margin-auto" aria-label="Fiorin Games Studio">
          <div className="eachSlider">
            <div className="sliderContent position-relative">
              <img src="/img/character-studio.png" alt="Fiorin Games Studio logo" title="I can build" width="267" height="400" />
              </div>
              </div>
              </section>
      </section>
      <section id="contact"><h2 className="sectionTitle text-center">Where do I find the Studio extra content?</h2><div className="contactLinks text-center"><ul id="contactList"><li className="contactItem"><a href="https://www.instagram.com/fioringames">Instagram</a></li></ul></div></section>
      <div className="divider" />
    </div>
      <section id="games" className="mt-5"><h2 className="sectionTitle text-center">What about the games?</h2><ProjectList items={games} /></section>
      <footer className="clearfix"><div className="text-center"><a href="/"><img src="/img/fiorin.png" alt="Fiorin" title="Fiorin Games Studio" width="62" height="64" /></a><p className="phrase"><small>Roll for initiative!</small></p></div></footer>
    </div>
  </div></>;
}

export default StudioPage;
