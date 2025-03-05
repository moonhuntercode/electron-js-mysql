// src/renderer/src/views/Dashboard.jsx

import React from 'react'

/**
 * Vista del panel de control.
 * @param {Object} props - Props del componente.
 * @param {function} props.onLogout - Función para cerrar sesión.
 * @param {function} props.onViewChange - Función para cambiar la vista.
 */
const Dashboard = ({ onLogout, onViewChange }) => {
  return (
    <div className="dashboard-container">
      <h1>Panel de Control</h1>
      <p>Bienvenido al panel de administración.</p>

      <button onClick={() => onViewChange('register-employee')}>Registrar Empleado</button>
      <button onClick={onLogout}>Cerrar Sesión</button>
    </div>
  )
}

export default Dashboard
