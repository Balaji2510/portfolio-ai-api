import { Request, Response } from 'express';
import { ProjectsService, SkillsService, ExperienceService, EducationService } from './portfolio.service';
import { asyncHandler } from '../../middleware/error.middleware';

const projectsService = new ProjectsService();
const skillsService = new SkillsService();
const experienceService = new ExperienceService();
const educationService = new EducationService();

// Projects
export class ProjectsController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await projectsService.getAllProjects(page, limit);

    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: result.projects,
      pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) },
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const project = await projectsService.getProjectById(id);
    res.status(200).json({ success: true, message: 'Project retrieved successfully', data: project });
  });

  static getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = String(req.params.slug);
    const project = await projectsService.getProjectBySlug(slug);
    res.status(200).json({ success: true, message: 'Project retrieved successfully', data: project });
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const project = await projectsService.createProject(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const project = await projectsService.updateProject(id, req.body);
    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await projectsService.deleteProject(id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  });
}

// Skills
export class SkillsController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const result = await skillsService.getAllSkills(page, limit);

    res.status(200).json({
      success: true,
      message: 'Skills retrieved successfully',
      data: result.skills,
      pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) },
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const skill = await skillsService.getSkillById(id);
    res.status(200).json({ success: true, message: 'Skill retrieved successfully', data: skill });
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const skill = await skillsService.createSkill(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const skill = await skillsService.updateSkill(id, req.body);
    res.status(200).json({ success: true, message: 'Skill updated successfully', data: skill });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await skillsService.deleteSkill(id);
    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  });
}

// Experience
export class ExperienceController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await experienceService.getAllExperiences(page, limit);

    res.status(200).json({
      success: true,
      message: 'Experiences retrieved successfully',
      data: result.experiences,
      pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) },
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const experience = await experienceService.getExperienceById(id);
    res.status(200).json({ success: true, message: 'Experience retrieved successfully', data: experience });
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const experience = await experienceService.createExperience(req.body);
    res.status(201).json({ success: true, message: 'Experience created successfully', data: experience });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const experience = await experienceService.updateExperience(id, req.body);
    res.status(200).json({ success: true, message: 'Experience updated successfully', data: experience });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await experienceService.deleteExperience(id);
    res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  });
}

// Education
export class EducationController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await educationService.getAllEducations(page, limit);

    res.status(200).json({
      success: true,
      message: 'Educations retrieved successfully',
      data: result.educations,
      pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) },
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const education = await educationService.getEducationById(id);
    res.status(200).json({ success: true, message: 'Education retrieved successfully', data: education });
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const education = await educationService.createEducation(req.body);
    res.status(201).json({ success: true, message: 'Education created successfully', data: education });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const education = await educationService.updateEducation(id, req.body);
    res.status(200).json({ success: true, message: 'Education updated successfully', data: education });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await educationService.deleteEducation(id);
    res.status(200).json({ success: true, message: 'Education deleted successfully' });
  });
}
