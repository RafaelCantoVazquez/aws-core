import { Request, Response } from 'express';
import { Teacher, TeacherSchema } from '../models/teacherModel';

var teachers: Teacher[] = [];

export const getTeachers = (req: Request, res: Response) => {
  if (teachers.length === 0) {
    return res.status(404).json({ message: 'There is no teachers' });
  }
  return res.status(200).json(teachers);
};

export const getTeacherById = (req: Request, res: Response) => {
  const teacher = teachers.find((t) => t.id == req.params.id);

  if (!teacher) {
    return res
      .status(404)
      .json({ message: 'There is no teacher with id ' + req.params.id });
  }

  return res.status(200).json(teacher);
};

export const createTeacher = (req: Request, res: Response) => {
  const teacher = { ...req.body };

  const { error, value } = TeacherSchema.validate(teacher);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid teacher data', error: error });
  }

  teachers.push(teacher);

  return res.status(201).json(value);
};

export const updateTeacher = (req: Request, res: Response) => {
  const teacher = { ...req.body };

  const { error, value } = TeacherSchema.validate(teacher);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid teacher data', error: error });
  }

  teachers = teachers.map((t) => {
    if (t.id == req.params.id) {
      t = teacher;
    }
    return t;
  });

  return res.status(200).json(teacher);
};

export const deleteTeacher = (req: Request, res: Response) => {
  let isTeacherDeleted = false;
  teachers = teachers.filter((teacher) => {
    if (teacher.id != req.params.id) {
      return teacher;
    } else {
      isTeacherDeleted = true;
    }
  });

  if (!isTeacherDeleted) {
    return res
      .status(404)
      .json({ message: 'There is no teacher with id ' + req.params.id });
  }

  return res.status(200).json(teachers);
};
