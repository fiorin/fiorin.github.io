import type { CSSProperties } from "react";
import ProjectList from "./components/ProjectList";
import Seo from "./components/Seo";

const heroCaptions: [string, string][] = [
  ["Typescript", "left:7%;top:10%;transform:rotate(-35deg)"],
  ["Go", "left:12%;top:32%;transform:rotate(-25deg)"],
  ["NodeJS", "left:3%;top:53%;transform:rotate(-6deg)"],
  ["Php", "left:11%;top:73%;transform:rotate(-20deg)"],
  ["Python", "right:9%;top:10%;transform:rotate(23deg)"],
  ["Javascript", "right:3%;top:30%;transform:rotate(10deg)"],
  ["NestJs", "right:8%;top:56%;transform:rotate(27deg)"],
  ["Rust", "right:8%;top:74%;transform:rotate(23deg)"],
];

const abilities = [
  { id: "abilityCode", side: "abilityLeft", title: "< code >", subtitle: "I can code!", image: "code.gif", body: ["Languages and frameworks are just implementations. The real work is breaking down complex domains, designing clean abstractions, and solving the actual business problem.", "Across web, mobile, or desktop—adaptable architecture for any stack."], tags: "TypeScript Python Go PHP Rust Next.js Nest.js" },
  { id: "abilityAi", side: "abilityRight", title: "AI & Agent Workflows", subtitle: "Everyone needs an agent. Some need a supervisor.", image: "ai.png", body: ["A supervisory agent with shared context, watching over specialised agents so they stop stepping on each other.", "Agent workflows with a hundred actions, events and integrations. Content pipelines that actually shipped. And yes, I use them to write my own tests."], tags: "Agents Orchestration Workflows LLM" },
  { id: "abilityIife", side: "abilityLeft", title: "back = () => void 0", subtitle: "Pure execution, zero side-effects, full observability", image: "back.png", body: ["Building backends so quiet and reliable that the on-call engineer can actually sleep.", "If it breaks in production, I owe you a coffee."], tags: "NodeJS Go Rust Python" },
  { id: "abilityFront", side: "abilityRight", title: ".: front ..", subtitle: "Every Pixel Matters", image: "front.png", body: ["A good looking front is the best friend of a great code.", "It's nonsense that a developer doesn't need to know how to make beautiful interfaces. It is survival!"], tags: "NextJs ReactJs Vue" },
  { id: "abilityEdit", side: "abilityLeft", title: "editor.png", subtitle: "Everyone needs an editor", image: "edit.png", body: ["UI/UX design, graphics editing, and layout—handling the visual side as comfortably as the code.", "Covering the entire pipeline from design concept to pixel-perfect execution. "], tags: "Photoshop Figma" },
  { id: "abilityGit", side: "abilityRight", title: "--version", subtitle: 'git commit -m "just a little fix"', image: "git.png", body: ["Working daily with distributed repositories creates a natural bond with version control and team collaboration.", "Keeping histories clean, conflicts low, and deployments smooth—one branch at a time."], tags: "git svn" },
  { id: "ability3d", side: "abilityLeft", title: "3d x,y,z", subtitle: "From Blender meshes to physical prints.", image: "3dmodel.png", body: ["Tripped on a Cartesian plane and fell on the Z axis.", "Hands-on experience with 3D modeling, texturing, physical 3D printing, and indie game assets."], tags: "Blender 3dPrinter Gamedev" },
  { id: "abilityGame", side: "abilityRight", title: "game dev", subtitle: "↑ ↑ ↓ ↓ ← → ← → B A", image: "gamedev.png", body: ["Designing games—both digital and tabletop—is as fun as playing them, serving as the ultimate playground for mechanics, logic, and continuous learning.", "GameJam organizer, active modder, board game designer, and indie developer building projects in Unity and Phaser."], tags: "Phaser Unity3d Boardgame"},
  { id: "abilityClass", side: "abilityLeft", title: "101 coding class", subtitle: "Everyone should learn to code", image: "class.png", body: ["M.Sc. in Computer Science - AI and former University Professor.", "Taught algorithms, database systems, and core programming languages to the next generation of engineers while mentoring students for coding competitions.   "], tags: "AI Python Java C++ SQL" },
];

type AbilityItem = { id: string; side: string; title: string; subtitle: string; image: string; body: string[]; tags: string; gameJam?: boolean };
const Tags = ({ value }: { value: string }) => <p className="abilitieTags">{value.split(" ").map((tag) => <span className="projectTag" key={tag}>#{tag}</span>)}</p>;
const inlineStyle = (value: string): CSSProperties => Object.fromEntries(value.split(";").filter(Boolean).map((rule) => rule.split(":").map((part) => part.trim()))) as CSSProperties;

function Ability({ item }: { item: AbilityItem }) {
  return <section id={item.id} className={item.side}><div className="abilityContainer clearfix">
    <div className="abilityContent"><h3 className="abilityTitle">{item.title}</h3><h4 className="abilitySubtitle">{item.subtitle}</h4>
      {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p></p>
      <Tags value={item.tags} />
    </div><div className="abilityPreview"><div className="abilityPreviewContent"><img src={`/img/${item.image}`} alt={item.title} width={300} height={225} loading="lazy" className="abilityImage" /></div></div>
  </div></section>;
}

function App() {
  return <><Seo title="Fior.in — Software developer, designer and educator" description="Fiorin is a software developer, designer and educator. Code, front-end, 3D, game development and teaching." canonical="https://fior.in/" /><div id="page" className="position-relative margin-auto"><nav id="menu" aria-label="Main navigation"><p className="menuTitle">Menu</p><ul id="menuList"><li className="menuItem"><a href="#who">Who am I ?</a></li><li className="menuItem"><a href="#contact">Contact</a></li><li className="menuItem"><a href="#abilities">Abilities</a></li><li className="menuItem"><a href="#projects">Projects</a></li></ul></nav>
    <div className="all"><header id="logo"><h1 className="logo" title="It's me!"><a href="https://www.fior.in"><img src="/img/fiorin.png" alt="fior.in" width="62" height="64" /></a></h1></header><div className="bgHeaderBottom clearfix">
      <section id="who"><section id="welcome" className="text-center"><div id="welcomeFirstLine"><span id="welcomeHi">Hi</span><span id="welcomeIm">, i'm</span><span id="welcomeFiorin"> Fiorin</span></div><div className="welcomeSecondLine"><span id="welcomeIcan">I can code!</span> <span id="welcomeMuchMore">& much more</span></div></section>
        <section id="characterSlider" className="margin-auto" aria-label="Fiorin can code">
          <div className="eachSlider">
            <div className="sliderContent position-relative">
              <img src="/img/character.png" alt="Code skills: Typescript, Javascript, NodeJS, PHP, Python, NextJS, NestJS and Rust" title="I can code!" width="200" height="400" />{heroCaptions.map(([label, style]) => <div className="floatCaption" style={inlineStyle(style)} key={label}><span>{label}</span></div>)}
              </div>
              </div>
              </section>
      </section>
      <section id="contact"><h2 className="sectionTitle text-center">Where do I find your contacts and social stuff?</h2><div className="contactLinks text-center"><ul id="contactList"><li className="contactItem"><a href="https://www.linkedin.com/in/fiorin" target="_blank" rel="noreferrer">Linkedin</a></li><li className="contactItem"><a href="https://github.com/fiorin" target="_blank" rel="noreferrer">Github</a></li><li className="contactItem"><a href="http://lattes.cnpq.br/7583684423712640" target="_blank" rel="noreferrer">Lattes</a></li></ul></div></section>
      <div className="divider" /><section id="abilities"><h2 className="sectionTitle text-center">Tell me more about your skills, abilities and superpowers...</h2></section>
    </div><section>{abilities.map((item) => <Ability item={item} key={item.id} />)}</section>
      <section id="projects" className="mt-5"><h2 className="sectionTitle text-center">What about side projects?</h2><ProjectList /></section>
      <footer className="clearfix"><div className="text-center"><a href="#"><img src="/img/fiorin.png" alt="Fior.in" title="It's me, again!" width="62" height="64" /></a><p className="phrase"><small>Computer Science Yoda I am!</small></p></div></footer>
    </div>
  </div></>;
}

export default App;
