import { type Language } from "../i18n";
import projects from "./projects.json" with { type: "json" };

export interface Project {
  name: string;
  description: string;
  url: string;
  icon: string;
  tech: string[];
  status: string;
}

type ProjectData = Omit<Project, "description" | "status" | "tech"> & {
  description: Record<Language, string>;
  status: Record<Language, string>;
  tech?: string[];
};
const projectData: ProjectData[] = projects;

// Pages CMS edits the JSON data; this adapter keeps the page's localized shape.
export function getProjects(lang: Language): Project[] {
  return projectData.map((project) => ({
    ...project,
    description: project.description[lang],
    status: project.status[lang],
    tech: project.tech ?? [],
  }));
}
