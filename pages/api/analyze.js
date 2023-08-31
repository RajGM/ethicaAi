/* eslint-disable import/no-anonymous-default-export */

// const key = process.env.OPENAI_KEY
// const cohere_key = process.env.COHERE_KEY
// const cohere = require('cohere-ai');
//cohere.init(cohere_key)
const huggingface_key=process.env.HUGGINGFACE_KEY

const examples = [
    { text: 'The order came 5 days early', label: 'positive review' },
    { text: 'The item exceeded my expectations', label: 'positive review' },
    { text: 'I ordered more for my friends', label: 'positive review' },
    { text: 'I would buy this again', label: 'positive review' },
    { text: 'I would recommend this to others', label: 'positive review' },
    { text: 'The package was damaged', label: 'negative review' },
    { text: 'The order is 5 days late', label: 'negative review' },
    { text: 'The order was incorrect', label: 'negative review' },
    { text: 'I want to return my item', label: 'negative review' },
    { text: 'The product was okay', label: 'neutral review' },
    { text: 'I received five items in total', label: 'neutral review' },
    { text: 'I bought it from the website', label: 'neutral review' },
    { text: 'I used the product this morning', label: 'neutral review' },
    { text: 'The product arrived yesterday', label: 'neutral review' },
];

export default async (req, res) => {
    console.log("analyze.js")
    console.log("TOKEN:", huggingface_key)
    // res.status(200).json({ error: 'An error occurred while analyzing sentiment' });
   
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/siebert/sentiment-roberta-large-english', {
            headers: {
                Authorization: `Bearer ${huggingface_key}`, // Replace with your Hugging Face API token
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ inputs: req.body.text }),
        });

        const result = await response.json();
        console.log("result:", result)

        if (result && result.label) {
            const sentiment = result.label; // Extract the sentiment label from the response

            res.json({ sentiment });
        } else {
            res.status(500).json({ error: 'Unable to analyze sentiment' });
        }
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'An error occurred while analyzing sentiment' });
    }
};

async function cohereAPI(text) {
    try {

        const response = await cohere.classify({
            inputs: [req.body.text],
            examples: examples,
        });
        console.log(response);
        console.log(response.body.classifications[0].prediction);

        res.status(500).json({ error: 'Unable to analyze sentiment' });

    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'An error occurred while analyzing sentiment' });
    }
}


async function openAPI(text) {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`, // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                prompt: `Sentiment analysis of the following text:\n${text}\n`,
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
        console.log("data:", data)
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
}