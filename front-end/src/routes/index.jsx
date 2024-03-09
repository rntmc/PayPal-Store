import { Routes, Route, Navigate} from 'react-router-dom'

import {Home} from '../pages/Home'
import {ThankYou} from '../pages/ThankYou'

export function MainRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/thank-you" element={<ThankYou/>} />

      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}