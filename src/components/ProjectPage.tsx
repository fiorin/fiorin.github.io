import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

type NavItem = { label: string; href: string; icon?: IconName };
type ProjectPageProps = { navItems: NavItem[]; children: ReactNode };

export default function ProjectPage({ navItems, children }: ProjectPageProps) {
  return <div id="page" className="position-relative margin-auto projectPage">
    <nav id="menu" aria-label="Project navigation"><h6 className="menuTitle">Menu</h6><ul id="menuList">
      {navItems.map((item) => <li className="menuItem" key={item.label}><a href={item.href}>{item.icon && <Icon name={item.icon} className="menuIcon" />}{item.label}</a></li>)}
    </ul></nav>
    <div className="all"><header id="logo"><h1 className="logo" title="It's me!"><a href="/"><img src="/img/fiorin.png" alt="fior.in" width="78" height="25" /></a></h1></header>{children}
      <footer className="clearfix"><div className="text-center"><a href="/"><img src="/img/fiorin.png" alt="Fior.in" title="It's me, again!" width="78" height="25" /></a><p className="phrase"><small>Computer Science Yoda I am!</small></p></div></footer>
    </div>
  </div>;
}
