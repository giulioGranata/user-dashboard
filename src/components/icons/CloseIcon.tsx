interface CloseIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function CloseIcon({
  width = 20,
  height = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: CloseIconProps) {
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
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

