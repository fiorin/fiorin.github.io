import type { ReactNode } from "react";
import ProjectPage from "../components/ProjectPage";
import Seo from "../components/Seo";
import type { IconName } from "../components/Icon";

type ContentPageProps = {
  title: string;
  description: string;
  canonical: string;
  navItems?: { label: string; href: string; icon?: IconName }[];
  children: ReactNode;
};

/** Reusable route shell for future portfolio content pages. */
export default function ContentPage({ title, description, canonical, navItems = [{ label: "Home", href: "/", icon: "back" }], children }: ContentPageProps) {
  return <ProjectPage navItems={navItems}><Seo title={title} description={description} canonical={canonical} />{children}</ProjectPage>;
}
