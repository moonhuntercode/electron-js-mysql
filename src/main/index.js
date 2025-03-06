// src/main/index.js
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { getDb } from './db/drizzle.js' // Importa la función getDb
import * as schema from './db/schema.js' // Importa el esquema

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Archivo preload
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  try {
    const db = await getDb() // Espera a que db esté inicializado

    // Verifica la conexión consultando una tabla existente
    await db.select().from(schema.users).limit(1)
    console.log('   Conexión a MySQL verificada')

    // Verifica si existe un administrador por defecto
    const adminExists = await db
      .select()
      .from(schema.admins)
      .where(schema.admins.username.eq('admin'))
      .get()
    if (!adminExists) {
      await db.insert(schema.admins).values({
        username: 'admin',
        passwordHash: 'hashed_password_here' // Cambia esto por un hash real
      })
      console.log('  Administrador por defecto registrado')
    }

    createWindow()
  } catch (error) {
    console.error('❌ Error en la inicialización:', error)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// IPC Handler: Registrar un empleado
ipcMain.handle('register-employee', async (_, data) => {
  try {
    const db = await getDb() // Espera a que db esté inicializado
    await db.insert(schema.employees).values(data)
    console.log(`  Empleado ${data.name} registrado`)
    return { success: true, message: 'Empleado registrado exitosamente' }
  } catch (error) {
    console.error('❌ Error al registrar empleado:', error)
    return { success: false, message: 'Error al registrar empleado' }
  }
})

// IPC Handler: Iniciar sesión
ipcMain.handle('login', async (_, { userId, userType }) => {
  try {
    const db = await getDb() // Espera a que db esté inicializado
    await db.insert(schema.logs).values({
      userId,
      role: userType,
      action: 'login'
    })
    console.log(`  Log de inicio de sesión registrado para ${userType} ${userId}`)
    return { success: true, message: 'Inicio de sesión exitoso' }
  } catch (error) {
    console.error('❌ Error al registrar log:', error)
    return { success: false, message: 'Error al iniciar sesión' }
  }
})

// IPC Handler: Cerrar sesión
ipcMain.handle('logout', async (_, { userId, userType }) => {
  try {
    const db = await getDb() // Espera a que db esté inicializado
    await db.insert(schema.logs).values({
      userId,
      role: userType,
      action: 'logout'
    })
    console.log(`  Log de cierre de sesión registrado para ${userType} ${userId}`)
    return { success: true, message: 'Cierre de sesión exitoso' }
  } catch (error) {
    console.error('❌ Error al registrar log:', error)
    return { success: false, message: 'Error al cerrar sesión' }
  }
})

// IPC Handler: Obtener todos los empleados
ipcMain.handle('get-employees', async () => {
  try {
    const db = await getDb() // Espera a que db esté inicializado
    const employees = await db.select().from(schema.employees)
    console.log('  Empleados obtenidos correctamente')
    return { success: true, data: employees }
  } catch (error) {
    console.error('❌ Error al obtener empleados:', error)
    return { success: false, message: 'Error al obtener empleados' }
  }
})
