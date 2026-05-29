import { HashRouter, Routes, Route } from 'react-router-dom'

import OnboardingPage from '../pages/onboarding/OnboardingPage.jsx'
import QuizPage from '../pages/quiz/QuizPage.jsx'
import PuzzlePage from '../pages/games/PuzzlePage.jsx'
import CardFlipPage from '../pages/games/CardFlipPage.jsx'
import ResultPage from '../pages/result/ResultPage.jsx'
import NotFoundPage from '../pages/not-found/NotFoundPage.jsx'

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/games/puzzle' element={<PuzzlePage />} />
        <Route path='/games/card-flip' element={<CardFlipPage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}
