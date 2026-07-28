const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
  try {
    const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a test assistant.' },
          { role: 'user', content: 'hi' }
        ],
        model: 'llama3-8b-8192',
      });
      console.log('Success:', completion.choices[0].message.content);
  } catch (err) {
      console.error('Error:', err);
  }
}
test();
