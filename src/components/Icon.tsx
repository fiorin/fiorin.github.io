import type { SVGProps } from "react";

export type IconName = "external" | "link" | "search" | "back";

const paths: Record<IconName, string> = {
  external: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h5v2H7v10h10v-3h2v5H5V5Z",
  link: "M10.59 13.41a2 2 0 0 0 2.82 0l2-2a2 2 0 0 0-2.82-2l-.59.59-1.41-1.41.59-.59a4 4 0 0 1 5.65 5.65l-2 2a4 4 0 0 1-5.65 0l-.59-.59 1.41-1.41.59.59ZM13.41 10.59a2 2 0 0 0-2.82 0l-2 2a2 2 0 0 0 2.82 2l.59-.59 1.41 1.41-.59.59a4 4 0 0 1-5.65-5.65l2-2a4 4 0 0 1 5.65 0l.59.59-1.41 1.41-.59-.59Z",
  search: "M10 4a6 6 0 1 0 3.87 10.58l4.27 4.27 1.42-1.42-4.27-4.27A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  back: "m9 19-7-7 7-7 1.41 1.41L5.83 11H20v2H5.83l4.58 4.59L9 19Z"
};

export default function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}><path fill="currentColor" d={paths[name]} /></svg>;
}
