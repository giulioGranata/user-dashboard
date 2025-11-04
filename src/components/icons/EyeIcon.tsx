interface EyeIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  'aria-hidden'?: boolean;
}

export function EyeIcon({
  width = 20,
  height = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: EyeIconProps) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

