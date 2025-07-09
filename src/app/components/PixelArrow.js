// components/PixelArrow.js
export default function PixelArrow({ className = '' }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect rx="1" ry="1" x="11.3" y="11" width="2" height="2" />
      <rect rx="1" ry="1" x="14.7" y="13" width="2" height="2" />
      <rect rx="1" ry="1" x="11.3" y="15" width="2" height="2" />
    </svg>
  )
}
