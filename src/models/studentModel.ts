import Joi from 'joi';

export interface Student {
  id: string;
  nombres: string;
  apellidos: string;
  matricula: string;
  promedio: number;
}

export const StudentSchema = Joi.object({
  id: Joi.number().required(),
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  matricula: Joi.string().required(),
  promedio: Joi.number().required(),
});
