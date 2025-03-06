// import mysql from 'mysql2/promise' // Usamos mysql2 para crear la  conexion temporal
// import { Sequelize } from 'sequelize' // Usamos Sequelize para interactuar con la base de datos
// import dotenv from 'dotenv' // Para cargar variables de entorno

// // Cargar variables de entorno desde el archivo .env
// dotenv.config()

// // Verificar que las variables de entorno estén definidas
// if (
//   !process.env.DB_HOST ||
//   !process.env.DB_USER ||
//   !process.env.DB_PASSWORD ||
//   !process.env.DB_NAME
// ) {
//   throw new Error(
//     '❌ Faltan variables de entorno en .env. Asegúrate de configurar DB_HOST, DB_USER, DB_PASSWORD y DB_NAME.'
//   )
// }

// /**
//  * Función para validar y crear la base de datos si no existe.
//  */
// async function initializeDatabase() {
//   const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

//   let connection
//   try {
//     // Crear una  conexion sin especificar la base de datos
//     connection = await mysql.createConnection({
//       host: DB_HOST,
//       user: DB_USER,
//       password: DB_PASSWORD
//     })

//     console.log('  *************\n  conexion al servidor MySQL establecida.\n**************')

//     // Verificar si la base de datos existe
//     const [rows] = await connection.execute(`SHOW DATABASES LIKE '${DB_NAME}'`)
//     if (rows.length === 0) {
//       console.log(`❌ Base de datos '${DB_NAME}' no encontrada. Creando...`)
//       await connection.execute(`CREATE DATABASE ${DB_NAME}`)
//       console.log(`  Base de datos '${DB_NAME}' creada.`)
//     } else {
//       console.log(`  Base de datos '${DB_NAME}' ya existe.`)
//     }
//   } catch (error) {
//     console.error('❌ Error al validar/crear la base de datos:', error)
//     throw error // Propagar el error para que se maneje en el proceso principal
//   } finally {
//     // Cerrar la  conexion temporal, incluso si ocurre un error
//     if (connection) {
//       try {
//         await connection.end()
//         console.log('   conexion temporal cerrada.')
//       } catch (closeError) {
//         console.error('❌ Error al cerrar la  conexion temporal:', closeError)
//       }
//     }
//   }
// }

// // Inicializar Sequelize después de validar/crear la base de datos
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   logging: false // Desactivar logs de Sequelize para producción
// })

// /**
//  * Función para inicializar Sequelize y probar la  conexion.
//  */
// export async function initializeSequelize() {
//   try {
//     // Validar y crear la base de datos si no existe
//     await initializeDatabase()

//     // Probar la  conexion de Sequelize
//     console.log('🔍 Intentando autenticar con Sequelize...')
//     await sequelize.authenticate()
//     console.log('   conexion a la base de datos establecida correctamente.')
//   } catch (error) {
//     // Manejo específico de errores de Sequelize
//     if (error.name === 'SequelizeConnectionError') {
//       console.error(
//         '❌ Error de  conexion a la base de datos. Verifica que MySQL esté en ejecución y las credenciales en .env.'
//       )
//     } else if (error.name === 'SequelizeDatabaseError') {
//       console.error('❌ Error en la base de datos:', error.message)
//     } else {
//       console.error('❌ Error inesperado al inicializar Sequelize:', error)
//     }
//     throw error // Propagar el error para que se maneje en el proceso principal
//   }
// }

// // Exportar Sequelize para ser usado en otros archivos
// export default sequelize
