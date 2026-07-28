const mongoose = require('mongoose');
const Analytics = require('./src/models/analytics.model').default;

mongoose.connect('mongodb://localhost:27017/portfolio_ai').then(async () => {
  const all = await Analytics.find();
  console.log('Found', all.length, 'analytics documents.');
  
  if (all.length > 1) {
    console.log('Deleting extra documents...');
    // Keep the one with the highest portfolioViews or just delete all and recreate
    await Analytics.deleteMany({});
    
    // Create a new one
    await Analytics.create({
      portfolioViews: 5,
      uniqueVisitors: 2,
      aiChats: 1,
      contactRequests: 1,
      projectViews: 3,
      blogViews: 0
    });
    console.log('Created fresh analytics doc');
  } else {
    console.log(all[0]);
  }
  
  process.exit(0);
});
