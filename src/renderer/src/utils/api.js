// # Funciones IPC para comunicación con el backend
// src/renderer/src/utils/api.js

/**
 * Función para iniciar sesión.
 * @param {Object} data - Datos del usuario (userId, userType).
 * @returns {Promise<void>}
 */
export const login = async (data) => {
  try {
    await window.api.login(data)
    console.log('✅ Inicio de sesión exitoso.')
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}

/**
 * Función para cerrar sesión.
 * @param {Object} data - Datos del usuario (userId, userType).
 * @returns {Promise<void>}
 */
export const logout = async (data) => {
  try {
    await window.api.logout(data)
    console.log('✅ Cierre de sesión exitoso.')
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}

/**
 * Función para registrar un nuevo empleado.
 * @param {Object} data - Datos del empleado (name, email).
 * @returns {Promise<void>}
 */
export const registerEmployee = async (data) => {
  try {
    await window.api.registerEmployee(data)
    console.log('✅ Empleado registrado correctamente.')
  } catch (error) {
    console.error('❌ Error al registrar empleado:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}

/**
 * Función para obtener los logs del sistema.
 * @returns {Promise<Array>} - Lista de logs.
 */
export const fetchLogs = async () => {
  try {
    const logs = await window.api.fetchLogs()
    console.log('✅ Logs obtenidos correctamente.')
    return logs
  } catch (error) {
    console.error('❌ Error al obtener logs:', error)
    throw error // Propagar el error para manejarlo en el componente
  }
}
