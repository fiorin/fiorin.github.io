import rawGames from "./games.json";
import { validateProjects } from "./schema";

const games = validateProjects(rawGames);
export default games;
