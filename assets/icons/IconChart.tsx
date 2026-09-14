import { SVGProps } from "react";

const IconChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export default IconChart