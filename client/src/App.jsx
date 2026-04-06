import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './page/Home'
import Login from './page/authentication/Login'
import Register from './page/authentication/Register'
import AdminDashboard from './components/Admin/dummy'

const AppRoutes = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
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
