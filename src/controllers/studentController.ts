import { NextFunction, Request, Response } from 'express';
import { Student } from '../models/';
import { StudentSchema } from '../models/studentModel';
import { upload } from '../utils/profilePicture';
import { StudentValidator } from '../utils/joi';
import multer from 'multer';

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

export const uploadProfilePicture = async (req: Request, res: Response) => {
  await upload.single('foto')(req, res, async function (err) {
    if (err instanceof multer.MulterError)
      return res.status(400).json({
        message: 'Upload unsuccessful',
        errorMessage: err.message,
        errorCode: err.code,
      });
    if (err) {
      return res.status(404).json({ message: err.message });
    }

    await Student.update(
      {
        fotoPerfilUrl: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/fotos/${req.params.id}_fotoPerfil_${req.file.originalname}`,
      },
      { where: { id: req.params.id } }
    );

    const student = await Student.findByPk(req.params.id);

    return res.status(200).json(student);
  });
};
