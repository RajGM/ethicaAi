import React, { useState } from 'react';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const addReview = () => {
    const newReview = {
      text: reviewText,
      date: new Date().toLocaleString(),
      votes: 0,
    };

    setReviews([...reviews, newReview]);
    setReviewText('');
  };

  const analyzeReview = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reviewText }),
      });

      const data = await response.json();
      setAnalysisResult(data.sentiment); // Assuming the API response has a 'sentiment' field
    } catch (error) {
      console.error('Error analyzing review:', error);
    }
  };

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

  return (
    <div className="container">
      <button onClick={addReview}>Add Review</button>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Enter your review"
      />
      <button onClick={analyzeReview}>Analyze</button>
      {analysisResult && <div>Analysis Result: {analysisResult}</div>}
      <table>
        <thead>
          <tr>
            <th>Review</th>
            <th>Date</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.text}</td>
              <td>{review.date}</td>
              <td>
                <button onClick={() => handleVote(index, 'upvote')}>Upvote</button>
                <button onClick={() => handleVote(index, 'downvote')}>Downvote</button>
                {review.votes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
