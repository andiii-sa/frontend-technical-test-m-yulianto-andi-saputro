import { SVGProps } from "react";

const IconPackage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m4 7 8-4 8 4-8 4z" />
    <path d="m4 7 8 4 8-4v10l-8 4-8-4z" />
    <path d="M12 11v10" />
  </svg>
);

export default IconPackage