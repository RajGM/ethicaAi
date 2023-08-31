import React, { useState } from 'react';

// Define the Home component
export default function Home() {
  // State for managing reviews and review input
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);

  // Function to add a new review
  const addReview = () => {
    const newReview = {
      text: reviewText,
      date: new Date().toLocaleString(),
      votes: 0,
      sentiment: analysisResult,
    };

    setReviews([...reviews, newReview]);
    setReviewText('');
  };

  // Function to analyze a review using an API
  const analyzeReview = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reviewText}),
      });

      const data = await response.json();
      setAnalysisResult(data.sentiment);
      addReview();
    } catch (error) {
      console.error('Error analyzing review:', error);
    }
  };

  // Function to handle voting on a review
  const handleVote = (index, voteType) => {
    const updatedReviews = [...reviews];
    if (voteType === 'upvote') {
      updatedReviews[index].votes++;
    } else if (voteType === 'downvote') {
      updatedReviews[index].votes--;
    }
    updatedReviews.sort((a, b) => b.votes - a.votes);
    setReviews(updatedReviews);
  };

  // Function to toggle the review input textarea
  const toggleTextarea = () => {
    setShowTextarea(!showTextarea);
    setAnalysisResult(null);
    setReviewText(null);
  };

  // Render the component
  return (
    <div className="container mx-auto p-4">

      {/* Button to toggle review input */}
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={toggleTextarea}
        >
          {showTextarea ? 'Close' : 'Add Review'}
        </button>
      </div>

      {/* Review input textarea */}
      {showTextarea && (
        <textarea
          className="mt-4 p-2 border rounded w-full"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your review"
        />
      )}

      {/* Analyze button */}
      {showTextarea && (
        <div className="flex justify-center mb-4">
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={analyzeReview}
          >
            Analyze
          </button>
        </div>
      )}

      {/* Analysis result */}
      <div className="flex justify-center mb-4">
        {analysisResult && <div className="mt-4">Analysis Result: {analysisResult}</div>}
      </div>

      {/* Review table */}
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Review</th>
            <th className="p-2 border">Date & Time</th>
            <th className="p-2 border">Sentiment</th>
            <th className="p-2 border">Votes</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through reviews */}
          {reviews.map((review, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2 border">{review.text}</td>
              <td className="p-2 border">{review.date}</td>
              <td className="p-2 border">{review.sentiment}</td>
              <td className="p-2 border">
                {/* Voting buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                  <div>
                    <span className="ml-2">{review.votes}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded shadow mr-2"
                        onClick={() => handleVote(index, 'upvote')}
                      >
                        {/* Upvote icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded shadow"
                        onClick={() => handleVote(index, 'downvote')}
                      >
                        {/* Downvote icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
