import { SVGProps } from "react";

const IconType = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <path d="M5 5h14M12 5v14M8.5 19h7" />
  </svg>
);

export default IconType