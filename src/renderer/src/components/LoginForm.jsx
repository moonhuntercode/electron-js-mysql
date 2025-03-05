// src/renderer/src/components/LoginForm.jsx

import React, { useState } from 'react'
import { validateForm, loginSchema } from './FormValidator'
import { Input } from './index'
import { login } from '../utils/api' // Importamos la función IPC para iniciar sesión

export const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: null }) // Limpiar errores al escribir
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validar el formulario
    const validationErrors = await validateForm(formData, loginSchema)
    if (validationErrors) {
      setErrors(validationErrors) // Mostrar errores si existen
      setIsSubmitting(false)
      return
    }

    try {
      // Enviar los datos al backend
      await login(formData)
      alert('✅ Inicio de sesión exitoso.')
    } catch (error) {
      alert('❌ Error al iniciar sesión.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar Sesión</h2>

      <Input
        label="Nombre de Usuario"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        id="username"
        ariaLabel="Nombre de usuario"
        autoComplete="username"
        error={errors.username}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        id="password"
        ariaLabel="Contraseña"
        autoComplete="current-password"
        error={errors.password}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  )
}
