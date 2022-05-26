import aws from 'aws-sdk';
import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { Student } from '../models';

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  region: process.env.AWS_REGION,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    key: async function (req: Request, file, cb) {
      const student = await Student.findByPk(req.params.id);

      if (!student)
        throw new Error('There is no student with id ' + req.params.id);

      cb(null, `fotos/${req.params.id}_fotoPerfil_${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
