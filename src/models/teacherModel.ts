import Sequelize from 'sequelize';
import { sequelize } from '../config/db';

export const Teacher = sequelize.define('Teacher', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  apellidos: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numeroEmpleado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  horasClase: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export interface TeacherSchema {
  nombres: string;
  apellidos: string;
  numeroEmpleado: number;
  horasClase: number;
}
