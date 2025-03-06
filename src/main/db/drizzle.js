// src/main/db/drizzle.js
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import * as schema from './schema.js'

dotenv.config()

// Credenciales de la base de datos
const dbCredentials = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysqlmoonhunter!',
  database: process.env.DB_NAME || 'db3'
}

// Variable para almacenar la instancia de Drizzle
let db

// Función para verificar/crear la base de datos
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbCredentials.host,
      user: dbCredentials.user,
      password: dbCredentials.password
    })

    const [databases] = await connection.execute('SHOW DATABASES')
    const databaseExists = databases.some((db2) => db2.Database === dbCredentials.database)

    if (!databaseExists) {
      await connection.execute(`CREATE DATABASE ${dbCredentials.database}`)
      console.log(`✅ Base de datos '${dbCredentials.database}' creada.`)
    } else {
      console.log(`✅ Base de datos '${dbCredentials.database}' ya existe.`)
    }

    await connection.end()
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
    throw error
  }
}

// Inicializa Drizzle y devuelve la instancia de db
async function initializeDrizzle() {
  await initializeDatabase() // Asegura que la base de datos existe
  const pool = mysql.createPool(dbCredentials)
  db = drizzle(pool, { schema, mode: 'default' })
  console.log('✅ Conexión a MySQL con Drizzle establecida.')
}

// Exporta una función para obtener la instancia de db
export async function getDb() {
  if (!db) {
    await initializeDrizzle() // Inicializa si aún no está listo
  }
  return db
}
