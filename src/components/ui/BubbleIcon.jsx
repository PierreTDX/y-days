export default function BubbleIcon({ size = 87, style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 87 87"
      fill="none"
      style={style}
    >
      <mask id="path-1-inside-1_33_7449" fill="white">
        <path d="M18.1287 8.17087C37.6423 -5.84311 64.8217 -1.3848 78.8357 18.1288C92.8497 37.6424 88.3914 64.8218 68.8778 78.8358C49.3642 92.8498 22.1848 88.3914 8.1708 68.8779C-5.84317 49.3643 -1.38487 22.1848 18.1287 8.17087Z"/>
      </mask>
      <path
        d="M18.1287 8.17087C37.6423 -5.84311 64.8217 -1.3848 78.8357 18.1288C92.8497 37.6424 88.3914 64.8218 68.8778 78.8358C49.3642 92.8498 22.1848 88.3914 8.1708 68.8779C-5.84317 49.3643 -1.38487 22.1848 18.1287 8.17087Z"
        fill="url(#bubbleGradFill)"
        fillOpacity="0.15"
      />
      <path
        d="M18.1287 8.17087L19.8845 10.6157C38.0478 -2.42857 63.3466 1.72124 76.3909 19.8846L78.8357 18.1288L81.2806 16.373C66.2969 -4.49085 37.2367 -9.25765 16.3729 5.72603L18.1287 8.17087ZM78.8357 18.1288L76.3909 19.8846C89.4351 38.0479 85.2853 63.3467 67.122 76.3909L68.8778 78.8358L70.6336 81.2806C91.4974 66.2969 96.2642 37.2368 81.2806 16.373L78.8357 18.1288ZM68.8778 78.8358L67.122 76.3909C48.9587 89.4352 23.6599 85.2854 10.6156 67.1221L8.1708 68.8779L5.72596 70.6337C20.7096 91.4975 49.7698 96.2643 70.6336 81.2806L68.8778 78.8358ZM8.1708 68.8779L10.6156 67.1221C-2.42864 48.9587 1.72118 23.66 19.8845 10.6157L18.1287 8.17087L16.3729 5.72603C-4.49091 20.7097 -9.25771 49.7698 5.72596 70.6337L8.1708 68.8779Z"
        fill="url(#bubbleGradStroke)"
        mask="url(#path-1-inside-1_33_7449)"
      />
      <circle cx="22.1664" cy="7.16638" r="3.25" fill="#F0FDF4" stroke="#4ADE80" strokeWidth="1.5"/>
      <defs>
        <linearGradient id="bubbleGradFill" x1="0" y1="0" x2="87" y2="87" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7FFF0" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
        <linearGradient id="bubbleGradStroke" x1="0" y1="0" x2="87" y2="87" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7FFF0" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
      </defs>
    </svg>
  )
}
