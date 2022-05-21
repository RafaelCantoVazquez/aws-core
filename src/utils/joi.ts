import Joi from 'joi';

export const StudentValidator = Joi.object({
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  matricula: Joi.string().required(),
  promedio: Joi.number().required(),
});

export const TeacherValidator = Joi.object({
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  numeroEmpleado: Joi.number().required(),
  horasClase: Joi.number().required(),
});
