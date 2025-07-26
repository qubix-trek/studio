import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 8 8v8H4v-8z" />
      <path d="M12 4c-2.2 0-4 1.8-4 4v0" />
      <path d="M12 4c2.2 0 4 1.8 4 4v0" />
      <path d="M12 20a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4z" />
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    </svg>
  );
}
