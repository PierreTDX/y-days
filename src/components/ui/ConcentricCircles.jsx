import './ConcentricCircles.css'

const CIRCLES = [
  { size: 543.0, border: 0.75, opacity: 0.25 },
  { size: 688.18, border: 0.951, opacity: 0.375 },
  { size: 833.35, border: 1.151, opacity: 0.5 },
  { size: 978.53, border: 1.352, opacity: 0.625 },
  { size: 1123.71, border: 1.552, opacity: 0.75 },
  { size: 1268.89, border: 1.753, opacity: 0.875 },
  { size: 1414.06, border: 1.953, opacity: 1.0 },
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
