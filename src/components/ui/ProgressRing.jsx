import './ProgressRing.css'

export default function ProgressRing() {
  return (
    <div className="progress-ring">
      <svg
        className="progress-ring__svg"
        width="175" height="175" viewBox="0 0 175 175" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="175" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E7FFF0" />
            <stop offset="1" stopColor="#4ADE80" />
          </linearGradient>
        </defs>
        <path
          d="M36.2574 16.3416L39.769 21.2313C76.0957 -4.85726 126.693 3.44236 152.782 39.769L157.671 36.2574L162.561 32.7458C132.594 -8.98182 74.4735 -18.5154 32.7458 11.4519L36.2574 16.3416ZM157.671 36.2574L152.782 39.769C178.87 76.0957 170.571 126.693 134.244 152.782L137.756 157.671L141.267 162.561C182.995 132.594 192.528 74.4735 162.561 32.7458L157.671 36.2574ZM137.756 157.671L134.244 152.782C97.9174 178.87 47.3198 170.571 21.2313 134.244L16.3416 137.756L11.4519 141.267C41.4193 182.995 99.5396 192.528 141.267 162.561L137.756 157.671ZM16.3416 137.756L21.2313 134.244C-4.85727 97.9174 3.44236 47.3198 39.769 21.2313L36.2574 16.3416L32.7458 11.4519C-8.98183 41.4193 -18.5154 99.5396 11.4519 141.267L16.3416 137.756Z"
          fill="url(#ringGrad)"
        />
        <circle cx="44.333" cy="14.3325" r="6.5" fill="#F0FDF4" stroke="#4ADE80" strokeWidth="3" />
      </svg>
      <div className="progress-ring__avatar" />
    </div>
  )
}
