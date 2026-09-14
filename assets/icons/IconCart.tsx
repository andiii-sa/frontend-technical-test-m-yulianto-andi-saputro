import { SVGProps } from "react";

const IconCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3.5 5h2l1.8 9.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.6L20.5 8H6.2" />
    <circle cx="9.5" cy="19" r="1" />
    <circle cx="17" cy="19" r="1" />
  </svg>
);

export default IconCart