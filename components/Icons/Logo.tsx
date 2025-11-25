type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="78"
      viewBox="0 0 280 91"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Africa Blockchain Festival Logo"
      className={className}  // <-- now accepts external styling
    >
      <image
        href="https://2025.africablockchainfestival.com/logo-white.png"
        width="240"
        height="78"
        x="0"
        y="-3"
      />
    </svg>
  );
}
