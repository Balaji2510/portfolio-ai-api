import { Request, Response } from 'express';
import { ProjectsService, SkillsService, ExperienceService, EducationService, BlogService, CertificateService, SettingService, StatisticsService } from './portfolio.service';
import { asyncHandler } from '../../middleware/error.middleware';

const projectsService = new ProjectsService();
const skillsService = new SkillsService();
const experienceService = new ExperienceService();
const educationService = new EducationService();
const blogService = new BlogService();
const certificateService = new CertificateService();
const settingService = new SettingService();
const statisticsService = new StatisticsService();

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

// Blogs
export class BlogController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await blogService.getAllBlogs(page, limit);
    res.status(200).json({ success: true, message: 'Blogs retrieved successfully', data: result.blogs, pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) } });
  });
  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const blog = await blogService.getBlogById(id);
    res.status(200).json({ success: true, message: 'Blog retrieved successfully', data: blog });
  });
  static create = asyncHandler(async (req: Request, res: Response) => {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
  });
  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const blog = await blogService.updateBlog(id, req.body);
    res.status(200).json({ success: true, message: 'Blog updated successfully', data: blog });
  });
  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await blogService.deleteBlog(id);
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  });
}

// Certificates
export class CertificateController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await certificateService.getAllCertificates(page, limit);
    res.status(200).json({ success: true, message: 'Certificates retrieved successfully', data: result.certificates, pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) } });
  });
  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const certificate = await certificateService.getCertificateById(id);
    res.status(200).json({ success: true, message: 'Certificate retrieved successfully', data: certificate });
  });
  static create = asyncHandler(async (req: Request, res: Response) => {
    const certificate = await certificateService.createCertificate(req.body);
    res.status(201).json({ success: true, message: 'Certificate created successfully', data: certificate });
  });
  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const certificate = await certificateService.updateCertificate(id, req.body);
    res.status(200).json({ success: true, message: 'Certificate updated successfully', data: certificate });
  });
  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await certificateService.deleteCertificate(id);
    res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  });
}

// Settings
export class SettingController {
  static get = asyncHandler(async (req: Request, res: Response) => {
    const settings = await settingService.getSettings();
    res.status(200).json({ success: true, message: 'Settings retrieved successfully', data: settings });
  });
  static update = asyncHandler(async (req: Request, res: Response) => {
    const settings = await settingService.updateSettings(req.body);
    res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
  });
}

// Statistics
export class StatisticsController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await statisticsService.getAllStatistics(page, limit);
    res.status(200).json({ success: true, message: 'Statistics retrieved successfully', data: result.statistics, pagination: { total: result.total, page, limit, pages: Math.ceil(result.total / limit) } });
  });
  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const statistic = await statisticsService.getStatisticById(id);
    res.status(200).json({ success: true, message: 'Statistic retrieved successfully', data: statistic });
  });
  static create = asyncHandler(async (req: Request, res: Response) => {
    const statistic = await statisticsService.createStatistic(req.body);
    res.status(201).json({ success: true, message: 'Statistic created successfully', data: statistic });
  });
  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const statistic = await statisticsService.updateStatistic(id, req.body);
    res.status(200).json({ success: true, message: 'Statistic updated successfully', data: statistic });
  });
  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await statisticsService.deleteStatistic(id);
    res.status(200).json({ success: true, message: 'Statistic deleted successfully' });
  });
}
