
import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function QuizPage() {

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
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <h2 className="text-lg font-semibold">Question {i + 1}/{questions.length}</h2>
      <h3 className="text-xl font-bold mt-2.5">{questions[i].q}</h3>

      <div className="flex flex-wrap gap-3 mt-5">
        {questions[i].a.map((ans) => (
          <Button key={ans} onClick={() => setI(i + 1)}>
            {ans}
          </button>
        ))}
      </div>
    </div>
  )
}
