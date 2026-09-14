import { SVGProps } from "react";

const IconIcons = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <circle cx="8" cy="8" r="3" />
    <rect x="13" y="5" width="6" height="6" rx="1" />
    <path d="M5 18h6M16 14v6" />
  </svg>
);

export default IconIcons
