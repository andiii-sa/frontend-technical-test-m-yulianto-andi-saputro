import { SVGProps } from "react";

const IconDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3v12" />
    <path d="m8 11 4 4 4-4" />
    <path d="M5 20h14" />
  </svg>
);

export default IconDownload