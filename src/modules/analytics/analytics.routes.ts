import express from 'express';
import { AnalyticsController } from './analytics.controller';

import Analytics from '../../models/analytics.model';

const router = express.Router();

router.post('/track', AnalyticsController.track);
router.get('/', async (req, res) => {
  const all = await Analytics.find();
  res.json(all);
});

export default router;
