// src/main/db/schema.js
import { mysqlTable, serial, varchar, int, mysqlEnum, timestamp } from 'drizzle-orm/mysql-core'

/**
 * Tabla 'employees': Almacena información de empleados.
 */
export const employees = mysqlTable('employees', {
  id: serial('id').primaryKey(), // Clave primaria autoincremental
  name: varchar('name', { length: 255 }).notNull(), // Nombre del empleado (no nulo)
  email: varchar('email', { length: 255 }).notNull().unique(), // Email único del empleado
  createdAt: timestamp('created_at').defaultNow() // Fecha de creación (valor predeterminado: ahora)
})

/**
 * Tabla 'users': Almacena información básica de usuarios.
 */
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(), // Clave primaria autoincremental
  name: varchar('name', { length: 255 }).notNull(), // Nombre del usuario (no nulo)
  email: varchar('email', { length: 255 }).notNull().unique(), // Email único del usuario
  createdAt: timestamp('created_at').defaultNow() // Fecha de creación (valor predeterminado: ahora)
})

/**
 * Tabla 'admins': Almacena información de administradores.
 */
export const admins = mysqlTable('admins', {
  id: serial('id').primaryKey(), // Clave primaria autoincremental
  username: varchar('username', { length: 255 }).notNull().unique(), // Nombre de usuario único
  passwordHash: varchar('password_hash', { length: 255 }).notNull(), // Contraseña hasheada (no nula)
  createdAt: timestamp('created_at').defaultNow() // Fecha de creación (valor predeterminado: ahora)
})

/**
 * Tabla 'logs': Registra acciones realizadas por usuarios/administradores.
 */
export const logs = mysqlTable('logs', {
  id: serial('id').primaryKey(), // Clave primaria autoincremental
  userId: int('user_id').notNull(), // ID del usuario asociado al log (no nulo)
  role: mysqlEnum('role', ['admin', 'employee']).notNull(), // Rol del usuario (admin o employee)
  action: mysqlEnum('action', ['login', 'logout']).notNull(), // Acción registrada (login o logout)
  timestamp: timestamp('timestamp').defaultNow() // Fecha y hora del evento (valor predeterminado: ahora)
})
