import mongoose from 'mongoose';
import Analytics from './src/models/analytics.model';

mongoose.connect('mongodb://localhost:27017/portfolio_ai').then(async () => {
  const all = await Analytics.find();
  console.log('Found', all.length, 'analytics documents.');
  
  if (all.length > 1) {
    console.log('Deleting extra documents...');
    await Analytics.deleteMany({});
    
    await Analytics.create({
      portfolioViews: 5,
      uniqueVisitors: 2,
      aiChats: 1,
      contactRequests: 1,
      projectViews: 3,
      blogViews: 0
    });
    console.log('Created fresh analytics doc');
  } else if (all.length === 1) {
    console.log(all[0]);
  } else {
    console.log("No documents.");
  }
  
  process.exit(0);
});
