import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

const Student = sequelize.define('Student', {
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
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  promedio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  fotoPerfilUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export interface StudentSchema {
  nombres: string;
  apellidos: string;
  matricula: string;
  promedio: number;
}

export default Student;
