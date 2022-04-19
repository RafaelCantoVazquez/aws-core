import Joi from 'joi';

export interface Teacher {
  id: string;
  nombres: string;
  apellidos: string;
  numeroEmpleado: number;
  horasClase: number;
}

export const TeacherSchema = Joi.object({
  id: Joi.number().required(),
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  numeroEmpleado: Joi.number().required(),
  horasClase: Joi.number().required(),
});
