// src/main/models/User.js
import { DataTypes } from 'sequelize'
import sequelize from '../db'

// Definir el modelo de Usuario
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'users',
    timestamps: false // Desactivar timestamps si no los necesitas
  }
)

export default User
