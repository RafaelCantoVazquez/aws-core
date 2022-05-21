import { Sequelize } from 'sequelize';
import { DB_NAME, USERNAME, PASSWORD, HOSTNAME, PORT } from './config';
import { Student, Teacher } from '../models';

export const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  host: HOSTNAME,
  port: Number(PORT),
  dialect: 'mysql',
  // dialectOptions: {
  //   ssl: 'Amazon RDS',
  // },
});

export const connectDB = () => {
  try {
    sequelize.authenticate();
    Student.sync({ force: true });
    Teacher.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
