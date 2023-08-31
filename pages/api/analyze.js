/* eslint-disable import/no-anonymous-default-export */

export default async (req, res) => {
    try {
        // Get the review text from the request body
        const text = req.body.text;

        // Analyze sentiment using the Hugging Face model
        const sentiment = await analyzeSentimentWithHuggingFace(text);

        // Respond with the sentiment result
        res.json({ sentiment });
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).json({ error: 'An error occurred while analyzing sentiment' });
    }
};

// Function to analyze sentiment using the Hugging Face model
export async function analyzeSentimentWithHuggingFace(text) {
    try {
        // Make a request to the Hugging Face sentiment analysis model
        const response = await fetch('https://api-inference.huggingface.co/models/siebert/sentiment-roberta-large-english', {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_KEY}`, // Use environment variable for API token
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ inputs: text }), // Send review text for analysis
        });

        // Parse the response as JSON
        const result = await response.json();

        // Determine sentiment based on the analysis result
        if (result && (result[0][0].score <= 0.4 || result[0][0].score >= 0.8)) {
            return result[0][0].label; // Return sentiment label (positive/negative)
        } else {
            return 'NEUTRAL'; // If sentiment score is not clear, consider it neutral
        }
    } catch (error) {
        console.error('Error analyzing sentiment with Hugging Face:', error);
        return 'ERROR'; // Return 'ERROR' if an error occurs during analysis
    }
}
