// src/renderer/src/components/FormValidator.jsx

import * as yup from 'yup'

/**
 * Función para validar un formulario usando un esquema de Yup.
 * @param {Object} formData - Datos del formulario a validar.
 * @param {Object} schema - Esquema de validación de Yup.
 * @returns {Promise<Object>} - Retorna un objeto con errores si existen.
 */
export const validateForm = async (formData, schema) => {
  try {
    // Validar los datos contra el esquema
    await schema.validate(formData, { abortEarly: false })
    return null // No hay errores
  } catch (error) {
    // Mapear los errores de Yup a un formato más usable
    const validationErrors = {}
    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message
    })
    return validationErrors // Retornar los errores encontrados
  }
}

/**
 * Esquema de validación para el formulario de inicio de sesión.
 */
export const loginSchema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio.'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('La contraseña es obligatoria.')
})

/**
 * Esquema de validación para el formulario de registro de empleados.
 */
export const registerEmployeeSchema = yup.object().shape({
  name: yup.string().required('El nombre del empleado es obligatorio.'),
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido.')
    .required('El correo electrónico es obligatorio.')
})
