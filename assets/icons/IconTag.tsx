import { SVGProps } from "react";

const IconTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 12V5h7l9 9-6 6z" />
    <circle cx="8" cy="8" r="1" />
  </svg>
);

export default IconTag