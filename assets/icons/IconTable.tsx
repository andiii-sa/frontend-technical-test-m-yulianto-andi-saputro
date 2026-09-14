import { SVGProps } from "react";

const IconTable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M3.5 9h17M9 9v11M15 9v11" />
  </svg>
);

export default IconTable