interface SearchIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function SearchIcon({
  width = 18,
  height = 18,
  className,
  'aria-hidden': ariaHidden = true,
}: SearchIconProps) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

