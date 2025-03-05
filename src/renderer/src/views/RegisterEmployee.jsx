import React, { useState } from 'react'
import { registerEmployee } from '../utils/api'
import { validateForm, registerEmployeeSchema } from '../components/FormValidator'
import { Input } from '../components'

/**
 * Vista para registrar empleados.
 * @param {Object} props - Props del componente.
 * @param {function} props.onCancel - Función para cancelar el registro.
 */
const RegisterEmployee = ({ onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '' }) // Estado inicial del formulario
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Manejar cambios en los inputs.
   * @param {Event} e - Evento de cambio del input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target // Extraer el nombre y valor del input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Actualizar el estado con el nuevo valor
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null // Limpiar errores al escribir
    }))
  }

  /**
   * Manejar el envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validar el formulario
    const validationErrors = await validateForm(formData, registerEmployeeSchema)
    if (validationErrors) {
      setErrors(validationErrors) // Mostrar errores si existen
      setIsSubmitting(false)
      return
    }

    try {
      // Registrar el empleado
      await registerEmployee(formData)
      alert('✅ Empleado registrado correctamente.')
      onCancel() // Volver al dashboard
    } catch (error) {
      alert('❌ Error al registrar empleado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-employee-container">
      <h2>Registrar Empleado</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          name="name"
          value={formData.name} // Vincular el valor al estado
          onChange={handleChange} // Manejar cambios en el input
          required
          id="name"
          ariaLabel="Nombre del empleado"
          error={errors.name}
        />

        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email} // Vincular el valor al estado
          onChange={handleChange} // Manejar cambios en el input
          required
          id="email"
          ariaLabel="Correo electrónico del empleado"
          error={errors.email}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar Empleado'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default RegisterEmployee
