export type Project = {
  cover: string;
  year: string;
  color: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: "external" | "link" | "search";
  external?: boolean;
};


const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === "string");

export function validateProjects(value: unknown): Project[] {
  if (!Array.isArray(value)) throw new Error("projects.json must contain an array");
  for (const item of value) {
    if (!isRecord(item) || typeof item.cover !== "string" || typeof item.year !== "string" || typeof item.title !== "string" || typeof item.description !== "string" || !isStringArray(item.tags) || typeof item.href !== "string" || !["external", "link", "search"].includes(String(item.icon))) {
      throw new Error(`Invalid project entry: ${JSON.stringify(item)}`);
    }
  }
  return value as Project[];
}
