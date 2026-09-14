import { SVGProps } from "react";

const IconSpacing = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <path d="M4 7h16M4 17h16M7 4v6M17 14v6" />
  </svg>
);

export default IconSpacing
