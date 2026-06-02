import './ConcentricCircles.css'

const CIRCLES = [
  { size: '45vmax',  border: 1,   opacity: 0.2 },
  { size: '60vmax',  border: 1.3, opacity: 0.4 },
  { size: '75vmax',  border: 1.6, opacity: 0.6 },
  { size: '90vmax',  border: 1.9, opacity: 0.8 },
  { size: '105vmax', border: 2.2, opacity: 1.0 },
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
