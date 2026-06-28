import express from 'express';
import {
  ProjectsController,
  SkillsController,
  ExperienceController,
  EducationController,
} from './portfolio.controller';
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

// Projects - Public GET, Protected Write
router.get('/projects', ProjectsController.getAll);
router.get('/projects/:id', ProjectsController.getById);
router.get('/projects/slug/:slug', ProjectsController.getBySlug);
router.post('/projects', authMiddleware, adminMiddleware, ProjectsController.create);
router.put('/projects/:id', authMiddleware, adminMiddleware, ProjectsController.update);
router.delete('/projects/:id', authMiddleware, adminMiddleware, ProjectsController.delete);

// Skills - Public GET, Protected Write
router.get('/skills', SkillsController.getAll);
router.get('/skills/:id', SkillsController.getById);
router.post('/skills', authMiddleware, adminMiddleware, SkillsController.create);
router.put('/skills/:id', authMiddleware, adminMiddleware, SkillsController.update);
router.delete('/skills/:id', authMiddleware, adminMiddleware, SkillsController.delete);

// Experience - Public GET, Protected Write
router.get('/experience', ExperienceController.getAll);
router.get('/experience/:id', ExperienceController.getById);
router.post('/experience', authMiddleware, adminMiddleware, ExperienceController.create);
router.put('/experience/:id', authMiddleware, adminMiddleware, ExperienceController.update);
router.delete('/experience/:id', authMiddleware, adminMiddleware, ExperienceController.delete);

// Education - Public GET, Protected Write
router.get('/education', EducationController.getAll);
router.get('/education/:id', EducationController.getById);
router.post('/education', authMiddleware, adminMiddleware, EducationController.create);
router.put('/education/:id', authMiddleware, adminMiddleware, EducationController.update);
router.delete('/education/:id', authMiddleware, adminMiddleware, EducationController.delete);

export default router;
