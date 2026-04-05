import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Home from './page/Home'
import Login from './page/authentication/Login'

const AppRoutes = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
