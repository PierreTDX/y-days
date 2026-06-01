import { HashRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home/HomePage.jsx'
import OnboardingPage from '../pages/onboarding/OnboardingPage.jsx'
import QuizPage from '../pages/quiz/QuizPage.jsx'
import PuzzlePage from '../pages/games/PuzzlePage.jsx'
import CardFlipPage from '../pages/games/CardFlipPage.jsx'
import ResultPage from '../pages/result/ResultPage.jsx'
import NotFoundPage from '../pages/not-found/NotFoundPage.jsx'
import Capsule1 from '../pages/capsules/Capsule1.jsx'
import Capsule2 from '../pages/capsules/Capsule2.jsx'
import Capsule3 from '../pages/capsules/Capsule3.jsx'

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/games/puzzle' element={<PuzzlePage />} />
        <Route path='/games/card-flip' element={<CardFlipPage />} />
        <Route path='/capsules/1' element={<Capsule1 />} />
        <Route path='/capsules/2' element={<Capsule2 />} />
        <Route path='/capsules/3' element={<Capsule3 />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}
