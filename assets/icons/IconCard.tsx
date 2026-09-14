import { SVGProps } from "react";

const IconCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M3.5 9h17" />
  </svg>
);

export default IconCard