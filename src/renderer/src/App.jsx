// src/renderer/src/App.jsx

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import RegisterEmployee from './views/RegisterEmployee'

/**
 * Componente principal de la aplicación.
 */
function App() {
  const [view, setView] = useState('login') // Estado para controlar la vista actual
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado para rastrear la sesión
  const [loading, setLoading] = useState(false) // Estado para manejar el estado de carga

  /**
   * Cambiar la vista actual.
   * @param {string} newView - Nombre de la nueva vista.
   */
  const changeView = (newView) => {
    setView(newView)
  }

  /**
   * Manejar el inicio de sesión exitoso.
   */
  const handleLogin = () => {
    setLoading(true) // Activar estado de carga
    try {
      setIsLoggedIn(true)
      changeView('dashboard')
      toast.success('  Sesión iniciada correctamente.')
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error)
      toast.error('❌ Error al iniciar sesión. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false) // Desactivar estado de carga
    }
  }

  /**
   * Manejar el cierre de sesión.
   */
  const handleLogout = () => {
    setLoading(true) // Activar estado de carga
    try {
      setIsLoggedIn(false)
      changeView('login')
      toast.info('ℹ️ Sesión cerrada.')
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error)
      toast.error('❌ Error al cerrar sesión. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false) // Desactivar estado de carga
    }
  }

  return (
    <div className="app-container">
      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Mostrar la vista actual según el estado */}
      {loading ? (
        <div className="loading-screen">
          <p>Cargando...</p>
        </div>
      ) : (
        <>
          {view === 'login' && <Login onLogin={handleLogin} />}
          {view === 'dashboard' && isLoggedIn && (
            <Dashboard onLogout={handleLogout} onViewChange={changeView} />
          )}
          {view === 'register-employee' && isLoggedIn && (
            <RegisterEmployee onCancel={() => changeView('dashboard')} />
          )}
        </>
      )}
    </div>
  )
}

export default App
