import Icon from "./Icon";
import projects from "../data/projects";

export default function ProjectList() {
  return <ul id="projectsList">
    {projects.map((project) => <li className="projectListItem" key={project.title}>
      <a href={project.href} className="projectLink" target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined}>
        <div className="projectCoverCont">
          <img className="projectCover" src={`/img/${project.cover}`} alt="" width={75} height={75} loading="lazy" />
        </div>
        <div className="projectContentCont">
        <h3 className="projectTitle"><span className={`projectYear ${project.color}`}>{project.year}</span> {project.title} <Icon name={project.icon} className="projectIcon" /></h3>
        <p className="projectDescription">{project.description}</p>
        <div className="projectTags">{project.tags.map((tag) => <span className="projectTag" key={tag}>#{tag}</span>)}</div>

        </div>
      </a>
    </li>)}
  </ul>;
}
