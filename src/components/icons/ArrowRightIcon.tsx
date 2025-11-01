interface ArrowRightIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function ArrowRightIcon({
  width = 20,
  height = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: ArrowRightIconProps) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

