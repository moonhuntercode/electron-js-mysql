// src/renderer/src/components/Clock.jsx

import React, { useState } from 'react'

/**
 * Componente para mostrar y registrar la hora actual.
 */
export const Clock = () => {
  const [currentTime, setCurrentTime] = useState('') // Estado para almacenar la hora registrada
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString()) // Estado para mostrar la hora en vivo

  // Función para registrar la hora actual
  const handleRegisterTime = () => {
    const time = new Date().toLocaleTimeString() // Obtener la hora actual
    setCurrentTime(time) // Actualizar el estado con la hora registrada
  }

  // Efecto para actualizar la hora en vivo cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString()) // Actualizar la hora en vivo
    }, 1000)

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      <h3>Hora en Vivo</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{liveTime}</p>

      <button
        onClick={handleRegisterTime}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Registrar Hora
      </button>

      {currentTime && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h4>Hora Registrada</h4>
          <p style={{ fontSize: '1.2rem', color: '#333' }}>{currentTime}</p>
        </div>
      )}
    </div>
  )
}
