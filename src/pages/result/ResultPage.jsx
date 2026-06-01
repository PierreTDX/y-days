
import { Button } from "@/components/ui/button"

export default function ResultPage() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">Bravo 🎉</h1>
      <p className="text-sm text-muted-foreground mt-2">Vous avez terminé la formation</p>
      <Button className="mt-5">Recommencer</Button>
    </div>
  )
}
