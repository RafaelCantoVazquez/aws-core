import { Request, Response } from 'express';
import { Teacher, TeacherSchema } from '../models/teacherModel';
import { TeacherValidator } from '../utils/joi';

export const getTeachers = async (req: Request, res: Response) => {
  const teachers = await Teacher.findAll();

  return teachers
    ? res.status(200).json(teachers)
    : res.status(404).json({ message: 'There is no teachers' });
};

export const getTeacherById = async (req: Request, res: Response) => {
  const teacher = await Teacher.findByPk(req.params.id);

  return teacher
    ? res.status(200).json(teacher)
    : res
        .status(404)
        .json({ message: 'There is no teacher with id ' + req.params.id });
};

export const createTeacher = async (req: Request, res: Response) => {
  const teacherData: TeacherSchema = { ...req.body };

  const { error, value } = TeacherValidator.validate(teacherData);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid teacher data', error: error });
  }

  const teacher = await Teacher.create(value);

  return res.status(201).json(teacher);
};

export const updateTeacher = async (req: Request, res: Response) => {
  const teacherData: TeacherSchema = { ...req.body };

  const { error, value } = TeacherValidator.validate(teacherData);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid teacher data', error: error });
  }

  const teacher = await Teacher.update(value, { where: { id: req.params.id } });

  return res.status(200).json(teacher);
};

export const deleteTeacher = async (req: Request, res: Response) => {
  const teacher = await Teacher.destroy({ where: { id: req.params.id } });

  if (!teacher) {
    return res
      .status(404)
      .json({ message: 'There is no teacher with id ' + req.params.id });
  }

  return res.status(200).json(teacher);
};
