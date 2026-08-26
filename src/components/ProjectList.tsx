import Icon from "./Icon";
import projects from "../data/projects";

export default function ProjectList() {
  return <ul id="projectsList">
    {projects.map((project) => <li className="projectListItem" key={project.title}>
      <a href={project.href} className="projectLink" target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined}>
        <h6 className="projectTitle"><span className={`projectYear ${project.color}`}>{project.year}</span> {project.title} <Icon name={project.icon} className="projectIcon" /></h6>
        <p className="projectDescription">{project.description}</p>
        <div className="projectTags">{project.tags.map((tag) => <span className="projectTag" key={tag}>#{tag}</span>)}</div>
      </a>
    </li>)}
  </ul>;
}
