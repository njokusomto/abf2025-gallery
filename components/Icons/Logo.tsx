export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240"       // reduced from 280
      height="78"       // proportional height reduction
      viewBox="0 0 280 91"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Africa Blockchain Festival Logo"
      className="mx-auto"
    >
      <image
        href="https://2025.africablockchainfestival.com/logo-white.png"
        width="240"
        height="78"
        x="0"
        y="-3"          // nudge up slightly for perfect visual center
      />
    </svg>
  );
}
