
import { useState } from 'react'

export default function QuizPage(){

  const questions = [
    {
      q: "L’IA peut-elle aider à créer un cours ?",
      a: ["Oui", "Non"]
    },
    {
      q: "Quel est l’objectif principal ?",
      a: ["Gagner du temps", "Complexifier les cours"]
    }
  ]

  const [i, setI] = useState(0)

  return (
    <div className="glass" style={{padding:24}}>
      <h2>Question {i+1}/{questions.length}</h2>
      <h3 style={{marginTop:10}}>{questions[i].q}</h3>

      <div style={{display:'flex',gap:12,marginTop:20}}>
        {questions[i].a.map((ans)=>(
          <button className="btn" key={ans} onClick={()=>setI(i+1)}>
            {ans}
          </button>
        ))}
      </div>
    </div>
  )
}
