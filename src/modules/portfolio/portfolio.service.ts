import Project from '../../models/project.model';
import Skill from '../../models/skill.model';
import Experience from '../../models/experience.model';
import Education from '../../models/education.model';
import { IProject } from '../../models/project.model';
import { ISkill } from '../../models/skill.model';
import { IExperience } from '../../models/experience.model';
import { IEducation } from '../../models/education.model';

export class ProjectsService {
  async getAllProjects(page: number = 1, limit: number = 10): Promise<{ projects: IProject[]; total: number }> {
    const skip = (page - 1) * limit;
    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments();
    return { projects, total };
  }

  async getProjectById(id: string): Promise<IProject> {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async getProjectBySlug(slug: string): Promise<IProject> {
    const project = await Project.findOne({ slug });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async createProject(data: Partial<IProject>): Promise<IProject> {
    const project = await Project.create(data);
    return project;
  }

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  }

  async deleteProject(id: string): Promise<void> {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      throw new Error('Project not found');
    }
  }
}

export class SkillsService {
  async getAllSkills(page: number = 1, limit: number = 100): Promise<{ skills: ISkill[]; total: number }> {
    const skip = (page - 1) * limit;
    const skills = await Skill.find()
      .skip(skip)
      .limit(limit)
      .sort({ proficiency: -1 });

    const total = await Skill.countDocuments();
    return { skills, total };
  }

  async getSkillById(id: string): Promise<ISkill> {
    const skill = await Skill.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    return skill;
  }

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    const skill = await Skill.create(data);
    return skill;
  }

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill> {
    const skill = await Skill.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      throw new Error('Skill not found');
    }

    return skill;
  }

  async deleteSkill(id: string): Promise<void> {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
  }
}

export class ExperienceService {
  async getAllExperiences(page: number = 1, limit: number = 20): Promise<{ experiences: IExperience[]; total: number }> {
    const skip = (page - 1) * limit;
    const experiences = await Experience.find()
      .skip(skip)
      .limit(limit)
      .sort({ endDate: -1 });

    const total = await Experience.countDocuments();
    return { experiences, total };
  }

  async getExperienceById(id: string): Promise<IExperience> {
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new Error('Experience not found');
    }
    return experience;
  }

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    const experience = await Experience.create(data);
    return experience;
  }

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience> {
    const experience = await Experience.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      throw new Error('Experience not found');
    }

    return experience;
  }

  async deleteExperience(id: string): Promise<void> {
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      throw new Error('Experience not found');
    }
  }
}

export class EducationService {
  async getAllEducations(page: number = 1, limit: number = 20): Promise<{ educations: IEducation[]; total: number }> {
    const skip = (page - 1) * limit;
    const educations = await Education.find()
      .skip(skip)
      .limit(limit)
      .sort({ endDate: -1 });

    const total = await Education.countDocuments();
    return { educations, total };
  }

  async getEducationById(id: string): Promise<IEducation> {
    const education = await Education.findById(id);
    if (!education) {
      throw new Error('Education not found');
    }
    return education;
  }

  async createEducation(data: Partial<IEducation>): Promise<IEducation> {
    const education = await Education.create(data);
    return education;
  }

  async updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation> {
    const education = await Education.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      throw new Error('Education not found');
    }

    return education;
  }

  async deleteEducation(id: string): Promise<void> {
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      throw new Error('Education not found');
    }
  }
}
