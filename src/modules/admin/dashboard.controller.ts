import { Request, Response } from 'express';
import Analytics from '../../models/analytics.model';
import Project from '../../models/project.model';
import Message from '../../models/message.model';

export class DashboardController {
  static async getDashboardData(req: Request, res: Response) {
    try {
      // Find the first analytics document (or create mock data if none exists)
      const analytics = await Analytics.findOne() || {
        portfolioViews: 0,
        uniqueVisitors: 0,
        aiChats: 0,
        contactRequests: 0,
        projectViews: 0,
        blogViews: 0
      };

      const totalProjects = await Project.countDocuments();
      const totalMessages = await Message.countDocuments();
      
      console.log('Dashboard Data:', { analytics, totalProjects, totalMessages });

      res.json({
        success: true,
        data: {
          analytics,
          totalProjects,
          totalMessages
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ success: false, message: 'Server error fetching dashboard data.' });
    }
  }
}
