import { SVGProps } from "react";

const IconForm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M7 8h10M7 12h7M7 16h4" />
  </svg>
);

export default IconForm