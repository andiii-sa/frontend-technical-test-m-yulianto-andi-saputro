import { SVGProps } from "react";

const IconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default IconPlus