import { Request, Response } from 'express';
import { Student, StudentSchema } from '../models/studentModel';

var students: Student[] = [];

export const getStudents = (req: Request, res: Response) => {
  if (students.length === 0) {
    return res.status(404).json({ message: 'There is no students' });
  }
  return res.status(200).json(students);
};

export const getStudentById = (req: Request, res: Response) => {
  const student = students.find((s) => s.id == req.params.id);

  if (!student) {
    return res
      .status(404)
      .json({ message: 'There is no student with id ' + req.params.id });
  }

  return res.status(200).json(student);
};

export const createStudent = (req: Request, res: Response) => {
  const student = { ...req.body };

  const { error, value } = StudentSchema.validate(student);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid student data', error: error });
  }

  students.push(student);

  return res.status(201).json(value);
};

export const updateStudent = (req: Request, res: Response) => {
  const student = { ...req.body };

  const { error, value } = StudentSchema.validate(student);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Invalid student data', error: error });
  }

  students = students.map((s) => {
    if (s.id == req.params.id) {
      s = student;
    }
    return student;
  });

  return res.status(200).json(students);
};

export const deleteStudent = (req: Request, res: Response) => {
  let isStudentDeleted = false;
  students = students.filter((student) => {
    if (student.id != req.params.id) {
      return student;
    } else {
      isStudentDeleted = true;
    }
  });

  if (!isStudentDeleted) {
    return res
      .status(404)
      .json({ message: 'There is no student with id ' + req.params.id });
  }

  return res.status(200).json(students);
};
