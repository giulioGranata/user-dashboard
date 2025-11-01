interface SunIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function SunIcon({
  width = 20,
  height = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: SunIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="m12 2 0 2" />
      <path d="m12 20 0 2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="m2 12 2 0" />
      <path d="m20 12 2 0" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

