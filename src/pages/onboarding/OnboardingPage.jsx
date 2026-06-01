
import { Button } from "@/components/ui/button"

export default function OnboardingPage() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">Bienvenue dans votre kit IA pédagogique</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Apprenez à créer des cours rapidement grâce à l’IA.
      </p>

      <div className="flex gap-4 p-4">
        <Button>Bouton principal</Button>
        <Button variant="secondary">Bouton secondaire</Button>
        <Button variant="outline">Contour</Button>
        <Button variant="destructive">Supprimer</Button>
        <Button variant="ghost">Fantôme</Button>
      </div>
    </div>
  )
}
