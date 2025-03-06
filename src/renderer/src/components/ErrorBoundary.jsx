import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { db } from '@main/db/drizzle.js' // 🆕  conexion a Drizzle
import { logs } from '@main/db/schema.js' // 📜 Tabla de logs
import { sanitize } from 'sanitize-filename'
import { networkInterfaces } from 'node:os'

/**
 * Componente de frontera de errores para capturar errores en React.
 */
export const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [errorDetails, setErrorDetails] = useState(null)

  // 📡 Obtener dirección IP local
  const getLocalIP = () => {
    const nets = networkInterfaces()
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] || []) {
        if (net.family === 'IPv4' && !net.internal) return net.address
      }
    }
    return '127.0.0.1'
  }

  // 🚨 Manejador de errores
  const handleError = async (error, errorInfo) => {
    console.error('❌ Error capturado:', error, errorInfo)
    setHasError(true)
    setErrorDetails({ error, info: errorInfo })

    try {
      // 🛠️ Datos del error
      const timestamp = new Date().toISOString()
      const sanitizedMessage = sanitize(`Error: ${error.message || 'Sin mensaje'}`)
      const userIP = getLocalIP()

      // 🆕 Insertar log via Drizzle
      await db.insert(logs).values({
        userId: 'Sistema',
        userType: 'system',
        action: 'error',
        ip: userIP,
        userAgent: navigator.userAgent,
        timestamp: timestamp,
        message: sanitizedMessage
      })

      console.log('  Error registrado en la base de datos')
    } catch (dbError) {
      console.error('❌ Error al registrar log:', dbError)
      toast.error('🚨 ¡No se pudo registrar el error!')
      throw dbError
    }

    toast.error('🚨 Ocurrió un error crítico. Recarga la página.')
  }

  // 🔄 Captura errores globales
  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error, { componentStack: event.componentStack })
    }

    // Escucha errores globales
    window.addEventListener('error', errorHandler)
    return () => window.removeEventListener('error', errorHandler) // 🗑️ Limpia el listener
  }, [])

  // 🖥️ Interfaz de error
  if (hasError) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.title}>¡Algo salió mal! 🚨</h2>
        <p style={styles.message}>Se produjo un error inesperado.</p>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Recargar página 🔄
        </button>
        {errorDetails && (
          <pre style={styles.details}>
            {`Detalles técnicos:\n${errorDetails.info.componentStack}`}
          </pre>
        )}
      </div>
    )
  }

  return children
}

// 📏 Estilos del componente
const styles = {
  errorContainer: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '2rem auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  message: {
    fontSize: '1rem',
    marginBottom: '1.5rem'
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  details: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    fontSize: '0.9rem',
    color: '#333',
    overflowX: 'auto'
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}
