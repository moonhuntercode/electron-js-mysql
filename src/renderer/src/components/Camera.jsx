// src/renderer/src/components/Camera.jsx

import React, { useEffect, useRef } from 'react'

/**
 * Componente para acceder y mostrar la cámara del usuario.
 */
export const Camera = () => {
  const videoRef = useRef(null) // Referencia al elemento <video>

  useEffect(() => {
    let stream

    const startCamera = async () => {
      try {
        // Solicitar acceso a la cámara
        stream = await navigator.mediaDevices.getUserMedia({ video: true })

        // Asignar el stream al elemento <video>
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('❌ Error al acceder a la cámara:', error)
      }
    }

    startCamera()

    // Limpiar el stream cuando el componente se desmonta
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Cámara en Vivo</h3>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          maxWidth: '600px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      />
    </div>
  )
}
