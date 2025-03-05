// src/main/index.js
import { app, BrowserWindow, ipcMain } from 'electron' // 📦 Importamos módulos principales de Electron
import { join } from 'path' // 📂 Para manejar rutas de archivos
import sequelize, { initializeSequelize } from './db' // 🆕 Importamos Sequelize y la función de inicialización
import Admin from './models/Admin' // 🆕 Modelo de Administrador
import Employee from './models/Employee' // 🆕 Modelo de Empleado
import Log from './models/Log' // 🆕 Modelo de Logs

// Función para crear la ventana principal
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 📂 Ruta al archivo preload
      sandbox: false
    }
  })

  // Mostrar la ventana cuando esté lista
  mainWindow.on('ready-to-show', () => {
    mainWindow.show() // 🖥️ Muestra la ventana cuando está lista
  })

  // Cargar la URL del frontend (desarrollo) o el archivo HTML (producción)
  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']) // 🌐 Carga la URL del frontend en desarrollo
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')) // 📄 Carga el archivo HTML en producción
  }
}

// Evento cuando Electron ha terminado de inicializarse
app.whenReady().then(async () => {
  try {
    // Inicializar Sequelize y validar/crear la base de datos
    await initializeSequelize() // 🆕 Valida o crea la base de datos

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: false }) // 🔄 Sincroniza los modelos con la base de datos

    // Registrar un administrador por defecto si no existe
    const adminExists = await Admin.findOne({ where: { username: 'admin' } })
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'defaultpassword' // 🔑 Contraseña por defecto
      })
      console.log('✅ Administrador por defecto registrado.')
      console.log('----------------------------')
    }

    // Crear la ventana principal
    createWindow() // 🖥️ Crea la ventana principal
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error)
  }
})

// Evento cuando todas las ventanas están cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit() // ⛔ Cierra la aplicación en sistemas que no sean macOS
  }
})

// Evento para macOS: recrear la ventana si se hace clic en el ícono del dock
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow() // 🖥️ Recrea la ventana principal
  }
})

// 🆕 Manejador IPC para registrar logs de inicio de sesión
ipcMain.handle('login', async (_, { userId, userType }) => {
  try {
    // Registrar el log de inicio de sesión en la base de datos
    await Log.create({
      userId,
      userType,
      action: 'login'
    })
    console.log(`✅ ${userType} con ID ${userId} inició sesión.`)
  } catch (error) {
    console.error('❌ Error al registrar log de inicio de sesión:', error)
    throw error // ❌ Propagar el error al frontend
  }
})

// 🆕 Manejador IPC para registrar logs de cierre de sesión
ipcMain.handle('logout', async (_, { userId, userType }) => {
  try {
    // Registrar el log de cierre de sesión en la base de datos
    await Log.create({
      userId,
      userType,
      action: 'logout'
    })
    console.log(`✅ ${userType} con ID ${userId} cerró sesión.`)
  } catch (error) {
    console.error('❌ Error al registrar log de cierre de sesión:', error)
    throw error // ❌ Propagar el error al frontend
  }
})

// 🆕 Manejador IPC para registrar nuevos empleados
ipcMain.handle('register-employee', async (_, data) => {
  try {
    const { name, email } = data
    // Crear un nuevo empleado en la base de datos
    await Employee.create({ name, email })
    console.log(`✅ Empleado registrado: ${name} (${email})`)
  } catch (error) {
    console.error('❌ Error al registrar empleado:', error)
    throw error // ❌ Propagar el error al frontend
  }
})
