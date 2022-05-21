import { Request, Response } from 'express';
import { Student } from '../models/';
import { StudentSchema } from '../models/studentModel';
import { StudentValidator } from '../utils/joi';

export const getStudents = async (req: Request, res: Response) => {
  const students = await Student.findAll();

  return students
    ? res.status(200).json(students)
    : res.status(404).json({ message: 'There is no students' });
};

export const getStudentById = async (req: Request, res: Response) => {
  const student = await Student.findByPk(req.params.id);

  return student
    ? res.status(200).json(student)
    : res
        .status(404)
        .json({ message: 'There is no student with id ' + req.params.id });
};

export const createStudent = async (req: Request, res: Response) => {
  const studentData: StudentSchema = { ...req.body };

  const { error, value } = StudentValidator.validate(studentData);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid student data', error: error });
  }

  const student = await Student.create(value);

  return res.status(201).json(student);
};

export const updateStudent = async (req: Request, res: Response) => {
  const studentData: StudentSchema = { ...req.body };

  const { error, value } = StudentValidator.validate(studentData);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid student data', error: error });
  }

  const student = await Student.update(value, { where: { id: req.params.id } });

  return res.status(200).json(student);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const student = await Student.destroy({ where: { id: req.params.id } });

  if (!student) {
    return res
      .status(404)
      .json({ message: 'There is no student with id ' + req.params.id });
  }

  return res.status(200).json(student);
};
