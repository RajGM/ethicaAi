/* eslint-disable import/no-anonymous-default-export */
const key = "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";
//import fetch from 'node-fetch';

export default async (req, res) => {
    console.log("analyze.js")
  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`, // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        prompt: `Sentiment analysis of the following text:\n${req.body.text}\n`,
        temperature: 0.5,
        max_tokens: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"]
      }),
    });
    console.log("response")
    const data = await response.json();
    console.log("data:",data)
    if (data.choices && data.choices.length > 0) {
        console.log("data sentiments")
      const sentiment = data.choices[0].text; // Extract the sentiment from the response
      res.json({ sentiment });
    } else {
      res.status(500).json({ error: 'Unable to analyze sentiment' });
    }


  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ error: 'An error occurred while analyzing sentiment' });
  }
};
