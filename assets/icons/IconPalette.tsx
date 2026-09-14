import { SVGProps } from "react";

const IconPalette = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5c-3.5 0-6.5 2.4-6.5 5.6 0 2.8 2.2 4 4.2 4h1.2c1.1 0 1.6.7 1.2 1.6-.6 1.5.2 3 1.8 3.5" />
  </svg>
);

export default IconPalette