import { HashRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home/HomePage.jsx'
import OnboardingPage from '../pages/onboarding/OnboardingPage.jsx'
import ResultPage from '../pages/result/ResultPage.jsx'
import NotFoundPage from '../pages/not-found/NotFoundPage.jsx'
import TestsPage from '../pages/tests/TestsLayout.jsx'
import Capsule1 from '../pages/capsules/Capsule1.jsx'
import Capsule2 from '../pages/capsules/Capsule2.jsx'
import Capsule3 from '../pages/capsules/Capsule3.jsx'
import StepperContainer from '../components/layout/StepperContainer.jsx'

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
        <Route path='/stepper' element={<StepperContainer />} />
        <Route path='/capsules/1' element={<Capsule1 />} />
        <Route path='/capsules/2' element={<Capsule2 />} />
        <Route path='/capsules/3' element={<Capsule3 />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='/tests' element={<TestsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}
