import './ConcentricCircles.css'

const CIRCLES = [
  { size: '40vmax',  border: 1,   opacity: 0.2 },
  { size: '70vmax',  border: 1.6, opacity: 0.5 },
  { size: '105vmax', border: 2.2, opacity: 0.9 },
]

export default function ConcentricCircles() {
  return (
    <>
      {CIRCLES.map((c, i) => (
        <div
          key={i}
          className="concentric-circle"
          style={{
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            borderWidth: c.border,
          }}
        />
      ))}
    </>
  )
}
