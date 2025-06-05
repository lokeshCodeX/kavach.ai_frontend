import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'

// Simple auth check function (you should implement proper auth)
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Route>
  )
)

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
