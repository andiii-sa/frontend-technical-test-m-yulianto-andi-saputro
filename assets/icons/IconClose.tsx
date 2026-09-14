import { SVGProps } from "react";

const IconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export default IconClose