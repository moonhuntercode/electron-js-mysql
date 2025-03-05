// src/renderer/src/views/Login.jsx

import React from 'react'
import { LoginForm } from '../components/'

/**
 * Vista de inicio de sesión.
 */
const Login = () => {
  return (
    <div className="login-view-container">
      <h1>Bienvenido</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      <LoginForm />
    </div>
  )
}

export default Login
