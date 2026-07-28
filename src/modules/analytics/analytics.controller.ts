import { Request, Response } from 'express';
import Analytics from '../../models/analytics.model';
import { asyncHandler } from '../../middleware/error.middleware';

export class AnalyticsController {
  static track = asyncHandler(async (req: Request, res: Response) => {
    const { event } = req.body;
    
    const validEvents = ['portfolioViews', 'uniqueVisitors', 'resumeDownloads', 'projectViews', 'blogViews'];
    
    if (!validEvents.includes(event)) {
      res.status(400).json({ success: false, message: 'Invalid event type' });
      return;
    }

    // Find the analytics doc or create it
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics();
    }

    // Increment the specific event
    (analytics as any)[event] = ((analytics as any)[event] || 0) + 1;
    
    await analytics.save();

    res.status(200).json({ success: true, message: 'Event tracked' });
  });
}
