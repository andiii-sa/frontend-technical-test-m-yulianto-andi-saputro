import { SVGProps } from "react";

const IconCursor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 3.5 18 12l-5.5 1.3L10 19z" />
  </svg>
);

export default IconCursor
