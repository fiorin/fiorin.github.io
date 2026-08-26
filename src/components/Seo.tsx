import { useEffect } from "react";

type SeoProps = { title: string; description: string; canonical: string; image?: string };

function setMeta(name: string, content: string) {
  const attribute = name.startsWith("og:") ? "property" : "name";
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, name); document.head.appendChild(element); }
  element.content = content;
}

export default function Seo({ title, description, canonical, image = "https://fior.in/img/og.png" }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", image);
    let link = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [canonical, description, image, title]);
  return null;
}
