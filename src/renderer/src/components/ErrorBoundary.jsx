import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import sequelize from '@main/db'
import Log from '@main/models/Log.js'
import { sanitize } from 'sanitize-filename'
import ip from 'node::net'

/**
 * Componente ErrorBoundary para capturar errores en los componentes.
 */
export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [errorInfo, setErrorInfo] = useState(null)

  const handleError = async (error, errorInfo) => {
    console.error('❌ Error capturado por ErrorBoundary:', error, errorInfo)

    setHasError(true)
    setErrorInfo({ error, info: errorInfo })

    try {
      const timestamp = new Date().toISOString()
      const sanitizedMessage = sanitize(`Error: ${error.message || 'Error desconocido'}`)
      const userIp = ip.address()

      await Log.create({
        userId: 'Sistema',
        userType: 'system',
        action: 'error',
        ip: userIp,
        userAgent: navigator.userAgent,
        timestamp: timestamp,
        message: sanitizedMessage
      })

      console.log('✅ Error registrado en la base de datos.')
    } catch (dbError) {
      console.error('❌ Error al registrar el log en la base de datos:', dbError.message)
      toast.error('🚨 No se pudo registrar el error en la base de datos.')
      throw dbError
    }

    toast.error('🚨 Algo salió mal. Intenta recargar la página.')
  }

  useEffect(() => {
    if (hasError && errorInfo) {
      console.warn('⚠️ Error detectado:', errorInfo.error.message)
    }
  }, [hasError, errorInfo])

  if (hasError) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '2rem auto',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>¡Algo salió mal! 🚨</h2>
        <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
          Se produjo un error inesperado. Intenta recargar la página. 🔄
        </p>
        {errorInfo && (
          <pre style={{ fontSize: '0.9rem', color: '#333', overflowX: 'auto' }}>
            Detalles del error:
            {errorInfo.info.componentStack || 'Sin detalles adicionales.'}
          </pre>
        )}
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.8rem 1.5rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Recargar página 🔄
        </button>
      </div>
    )
  }

  return children
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}
