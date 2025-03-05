// src/main/models/Admin.js
import { DataTypes } from 'sequelize'
import sequelize from '../db'

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // ⭐ Autoincrementa el ID
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'admins',
    timestamps: false
  }
)

export default Admin
