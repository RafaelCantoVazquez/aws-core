import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horasClase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export interface TeacherSchema {
  nombres: string;
  apellidos: string;
  numeroEmpleado: number;
  horasClase: number;
}

export default Teacher;
