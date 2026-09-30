import type { ReactNode } from "react";
import ContentPage from "./ContentPage";
import resume from "../data/resume.json";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Basics = typeof resume.basics;
type Work = (typeof resume.work)[number];
type Education = (typeof resume.education)[number];
type SkillGroup = (typeof resume.skills)[number];
type Language = (typeof resume.languages)[number];

function formatDate(value?: string) {
  if (!value) return "Present";
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  return month && index >= 0 && index < 12 ? `${months[index]} ${year}` : year;
}

function Bullets({ text }: { text?: string }) {
  const lines = (text ?? "").split("\n").map((line) => line.replace(/^[-•]\s*/, "")).filter(Boolean);
  if (!lines.length) return null;
  return <ul className="resumeList">{lines.map((line, index) => <li key={index}>{line}</li>)}</ul>;
}

function Tags({ values }: { values: string[] }) {
  if (!values.length) return null;
  return <p className="resumeTags">{values.map((value) => <span className="projectTag" key={value}>{value}</span>)}</p>;
}

function Job({ job }: { job: Work }) {
  return <article className="resumeItem">
    <h3 className="resumeItemTitle">{job.position} <span className="resumeItemOrg">· {job.name}</span></h3>
    <p className="resumeItemMeta">{formatDate(job.startDate)} – {formatDate(job.endDate)}</p>
    <Bullets text={job.summary} />
    <Tags values={job.keywords} />
  </article>;
}

function Degree({ degree }: { degree: Education }) {
  return <article className="resumeItem">
    <h3 className="resumeItemTitle">{degree.studyType} · {degree.area}</h3>
    <p className="resumeItemMeta">{degree.institution} · {formatDate(degree.startDate)} – {formatDate(degree.endDate)}</p>
    <Bullets text={degree.summary} />
  </article>;
}

function BasicsBlock({ basics }: { basics: Basics }) {
  return <section className="resumeSection">
    <h2 className="sectionTitle">Contact</h2>
    <p className="resumeContact">
      <a href={`mailto:${basics.email}`}>{basics.email}</a>
      {" · "}
      <a href={basics.url}>{basics.url.replace(/^https?:\/\//, "")}</a>
      {" · "}
      <a href={`tel:${basics.phone.replace(/\s/g, "")}`}>{basics.phone}</a>
      {" · "}
      {basics.location.city}, {basics.location.region}, {basics.location.countryCode}
    </p>
    <p className="resumeContact">{basics.profiles.filter((profile) => profile.network !== "Twitter").map((profile) => <a href={profile.url} key={profile.network} target="_blank" rel="noreferrer">{profile.network}</a>).reduce<ReactNode[]>((nodes, node, index) => index === 0 ? [node] : [...nodes, " · ", node], [])}</p>
  </section>;
}

export default function ResumePage() {
  return <ContentPage
    title={`${resume.basics.name} — ${resume.basics.label}`}
    description={`${resume.basics.label} in ${resume.basics.location.city}, Brazil. ${resume.basics.summary.slice(0, 150)}`}
    canonical="https://fior.in/resume"
    navItems={[{ label: "Home", href: "/", icon: "back" }, { label: "Machine-readable", href: "/resume.json" }, { label: "Agent instructions", href: "/AGENTS.md" }]}
  >
    <main className="pageContent">
      <h1 className="resumeName">{resume.basics.name}</h1>
      <p className="resumeLabel">{resume.basics.label} · {resume.basics.location.city}, {resume.basics.location.countryCode}</p>

      <section className="resumeSection">
        <h2 className="sectionTitle">Summary</h2>
        <p>{resume.basics.summary}</p>
      </section>

      <BasicsBlock basics={resume.basics} />

      <section className="resumeSection">
        <h2 className="sectionTitle">Experience</h2>
        {resume.work.map((job) => <Job job={job} key={`${job.name}-${job.startDate}`} />)}
      </section>

      <section className="resumeSection">
        <h2 className="sectionTitle">Skills</h2>
        {resume.skills.map((group: SkillGroup) => <div className="resumeItem" key={group.name}>
          <h3 className="resumeItemTitle">{group.name}</h3>
          <Tags values={group.keywords} />
        </div>)}
      </section>

      <section className="resumeSection">
        <h2 className="sectionTitle">Education</h2>
        {resume.education.map((degree: Education) => <Degree degree={degree} key={degree.studyType} />)}
      </section>

      <section className="resumeSection">
        <h2 className="sectionTitle">Languages</h2>
        <p>{resume.languages.map((language: Language) => `${language.language} — ${language.fluency}`).join(" · ")}</p>
      </section>
    </main>
  </ContentPage>;
}
