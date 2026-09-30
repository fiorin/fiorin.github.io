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
  { id: "abilityCode", side: "abilityLeft", title: "< code >", subtitle: "I can code!", image: "code.gif", body: ["I think; I invent; I create; it works! Language is just a detail, knowing how to program is solving problems.", "No matter if it's on the web, mobile or desktop, there is always a way in my Swiss army knife mind."], tags: "Typescript Javascript Php Python Go Rust C++" },
  { id: "abilityFront", side: "abilityRight", title: ".: front ..", subtitle: "Every Pixel Matters", image: "front.png", body: ["A good looking front is the best friend of a great code.", "It's nonsense that a developer doesn't need to know how to make beautiful interfaces. It is survival!"], tags: "NextJs React Vue" },
  { id: "abilityEdit", side: "abilityLeft", title: "editor.png", subtitle: "Everyone needs an editor", image: "edit.png", body: ["Editing, drawing or vectoring. I immersed myself in the most diverse editors to cover all the bases."], tags: "Photoshop Illustrator" },
  { id: "abilityGit", side: "abilityRight", title: "--version", subtitle: 'git commit -m "just a little fix"', image: "git.png", body: ["Working daily with every kind of repository creates a bond with code versioning and collaborative work. As a family, in versions!"], tags: "git svn" },
  { id: "ability3d", side: "abilityLeft", title: "3d x,y,z", subtitle: "Tripped on a Cartesian plane and fell on a Z axis", image: "3dmodel.png", body: ["3D adventurer with notions of modeling, texture and animation using Blender.", "Focused on small and personal projects, mods and game development."], tags: "Blender" },
  { id: "abilityGame", side: "abilityRight", title: "game dev", subtitle: "↑ ↑ ↓ ↓ ← → ← → B A", image: "gamedev.png", body: ["Creating games is as fun as playing. They are a hobby and a daily learning.", "Staff and planner of a gameJam, drafted ideas, participated in mod communities, implemented small projects in Unity and Phaser."], tags: "Phase Unity3d C++"},
  { id: "abilityClass", side: "abilityLeft", title: "101 coding class", subtitle: "Everyone should learn to code", image: "class.png", body: ["I have a master's degree in Computer Science focused on Pattern Recognition.", "I recently taught algorithms and programming languages for technical and university courses."], tags: "Python Java C SQL" },
];

type AbilityItem = { id: string; side: string; title: string; subtitle: string; image: string; body: string[]; tags: string; gameJam?: boolean };
const Tags = ({ value }: { value: string }) => <p className="abilitieTags">{value.split(" ").map((tag) => <span className="projectTag" key={tag}>#{tag}</span>)}</p>;
const inlineStyle = (value: string): CSSProperties => Object.fromEntries(value.split(";").filter(Boolean).map((rule) => rule.split(":").map((part) => part.trim()))) as CSSProperties;

function Ability({ item }: { item: AbilityItem }) {
  return <section id={item.id} className={item.side}><div className="abilityContainer clearfix">
    <div className="abilityContent"><h3 className="abilityTitle">{item.title}</h3><h6 className="abilitySubtitle">{item.subtitle}</h6>
      {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p></p>
      <Tags value={item.tags} />
    </div><div className="abilityPreview"><div className="abilityPreviewContent"><img src={`/img/${item.image}`} alt={item.title} width={item.image === "gameDev.gif" ? 400 : item.image === "code.gif" ? 300 : 300} height={item.image === "gameDev.gif" ? 300 : 225} loading="lazy" className="abilityImage" /></div></div>
  </div></section>;
}

function App() {
  return <><Seo title="Fior.in — Software developer, designer and educator" description="Fiorin is a software developer, designer and educator. Code, front-end, 3D, game development and teaching." canonical="https://fior.in/" /><div id="page" className="position-relative margin-auto"><nav id="menu" aria-label="Main navigation"><h6 className="menuTitle">Menu</h6><ul id="menuList"><li className="menuItem"><a href="#who">Who am I ?</a></li><li className="menuItem"><a href="#contact">Contact</a></li><li className="menuItem"><a href="#abilities">Abilities</a></li><li className="menuItem"><a href="#projects">Projects</a></li></ul></nav>
    <div className="all"><header id="logo"><h1 className="logo" title="It's me!"><a href="https://www.fior.in"><img src="/img/fiorin.png" alt="fior.in" width="62" height="64" /></a></h1></header><div className="bgHeaderBottom clearfix">
      <section id="who"><section id="welcome" className="text-center"><div id="welcomeFirstLine"><span id="welcomeHi">Hi</span><span id="welcomeIm">, i'm</span><span id="welcomeFiorin"> Fiorin</span></div><div className="welcomeSecondLine"><span id="welcomeIcan">I can code!</span><span id="welcomeMuchMore">& much more</span></div></section>
        <section id="characterSlider" className="margin-auto" aria-label="Fiorin can code">
          <div className="eachSlider">
            <div className="sliderContent position-relative">
              <img src="/img/character.png" alt="Code skills: Typescript, Javascript, NodeJS, PHP, Python, NextJS, NestJS and Rust" title="I can code!" width="200" height="400" />{heroCaptions.map(([label, style]) => <div className="floatCaption" style={inlineStyle(style)} key={label}><span>{label}</span></div>)}
              </div>
              </div>
              </section>
      </section>
      <section id="contact"><h5 className="sectionTitle text-center">Where do I find your contacts and social stuff?</h5><div className="contactLinks text-center"><ul id="contactList"><li className="contactItem"><a href="https://www.linkedin.com/in/fiorin" target="_blank" rel="noreferrer">Linkedin</a></li><li className="contactItem"><a href="https://github.com/fiorin" target="_blank" rel="noreferrer">Github</a></li><li className="contactItem"><a href="http://lattes.cnpq.br/7583684423712640" target="_blank" rel="noreferrer">Lattes</a></li></ul></div></section>
      <div className="divider" /><section id="abilities"><h5 className="sectionTitle text-center">Tell me more about your skills, abilities and superpowers...</h5></section>
    </div><section>{abilities.map((item) => <Ability item={item} key={item.id} />)}</section>
      <section id="projects" className="mt-5"><h5 className="sectionTitle text-center">What about side projects?</h5><ProjectList /></section>
      <footer className="clearfix"><div className="text-center"><a href="#"><img src="/img/fiorin.png" alt="Fior.in" title="It's me, again!" width="62" height="64" /></a><p className="phrase"><small>Computer Science Yoda I am!</small></p></div></footer>
    </div>
  </div></>;
}

export default App;
