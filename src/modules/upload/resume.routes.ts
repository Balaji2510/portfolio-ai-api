import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import Resume from '../../models/resume.model';
import Upload from '../../models/upload.model';

const router = express.Router();

const uploadsRoot = path.resolve(process.cwd(), 'uploads', 'resumes');

if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(uploadsRoot, { recursive: true });
    cb(null, uploadsRoot);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname) || '.pdf';
    cb(null, `${uuidv4()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
      return;
    }

    cb(new Error('Only PDF files are allowed'));
  },
});

const coerceBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
  }

  return true;
};

router.get('/resume/upload', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Use POST to upload a PDF resume.',
    expected: {
      method: 'POST',
      contentType: 'multipart/form-data',
      fileField: 'file',
      optionalFields: ['title', 'version', 'active', 'uploadedBy'],
    },
  });
});

router.post('/resume/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const title = typeof req.body?.title === 'string' ? req.body.title : req.file.originalname.replace(/\.[^/.]+$/, '');
    const version = typeof req.body?.version === 'string' ? req.body.version : '1.0';
    const active = coerceBoolean(req.body?.active);
    const uploadedBy = typeof req.body?.uploadedBy === 'string' ? req.body.uploadedBy : undefined;

    const fileUrl = `/uploads/resumes/${req.file.filename}`;

    const resume = await Resume.create({
      title,
      version,
      fileName: req.file.originalname,
      fileUrl,
      fileSize: req.file.size,
      active,
      uploadedBy,
    });

    const uploadRecord = await Upload.create({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype || 'application/pdf',
      size: req.file.size,
      folder: 'resumes',
      uploadedBy,
    });

    return res.status(201).json({
      success: true,
      data: {
        resume,
        upload: uploadRecord,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/resume', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const resumes = await Resume.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, data: resumes });
  } catch (error) {
    next(error);
  }
});

export default router;
