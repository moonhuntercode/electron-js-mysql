// drizzle.config.js
import * as dotenv from 'dotenv'

// 📌 Carga las variables de entorno desde el archivo .env
dotenv.config()

// 📌 Lista de variables de entorno requeridas
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key])

// 🚨 Verificación de variables de entorno obligatorias
if (missingEnvVars.length > 0) {
  throw new Error(
    `❌ ERROR: Faltan las siguientes variables de entorno: ${missingEnvVars.join(', ')}.`
  )
}

// 📌 Configuración de Drizzle ORM para MySQL2
export default {
  schema: './src/main/db/schema.js', // 📜 Ruta al esquema de la base de datos
  out: './migrations', // 📂 Carpeta donde se generarán las migraciones
  driver: 'mysql2', // 🔌 Driver de MySQL2 (requerido para conexiones directas)
  dialect: 'mysql', // 🗄️ Dialecto de MySQL

  dbCredentials: {
    host: process.env.DB_HOST || 'localhost', // 🏠 Servidor de la base de datos
    user: process.env.DB_USER || 'root', // 👤 Usuario de la base de datos
    password: process.env.DB_PASSWORD || 'mysqlmoonhunter!', // 🔒 Contraseña (¡evita poner credenciales en código!)
    database: process.env.DB_NAME || 'db3', // 🗄️ Nombre de la base de datos
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306 // 📌 Puerto de MySQL (por defecto: 3306)
  },

  // 🔹 Configuración adicional (opcional)
  strict: true // 🚨 Activa validaciones estrictas en las migraciones
}
