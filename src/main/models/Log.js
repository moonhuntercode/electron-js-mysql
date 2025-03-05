// src/main/models/Log.js
import { DataTypes } from 'sequelize'
import sequelize from '../db' // Importar la instancia de Sequelize

// Definir el modelo de Log
const Log = sequelize.define(
  'Log', // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: Entero
      primaryKey: true, // Es la clave primaria
      autoIncrement: true // Autoincrementable
    },
    userId: {
      type: DataTypes.INTEGER, // Tipo de dato: Entero
      allowNull: false // No puede ser nulo
    },
    userType: {
      type: DataTypes.ENUM('admin', 'employee'), // Tipo de dato: Enumeración ('admin' o 'employee')
      allowNull: false // No puede ser nulo
    },
    action: {
      type: DataTypes.ENUM('login', 'logout'), // Tipo de dato: Enumeración ('login' o 'logout')
      allowNull: false // No puede ser nulo
    },
    timestamp: {
      type: DataTypes.DATE, // Tipo de dato: Fecha y hora
      defaultValue: DataTypes.NOW // Valor predeterminado: Fecha y hora actual
    }
  },
  {
    tableName: 'logs', // Nombre de la tabla en la base de datos
    timestamps: false // Desactivar timestamps (createdAt y updatedAt)
  }
)

// Exportar el modelo
export default Log
