import rawProjects from "./projects.json";
import { validateProjects } from "./schema";

const projects = validateProjects(rawProjects);
export default projects;
