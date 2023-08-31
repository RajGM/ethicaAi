# Sentiment Analysis and Review Voting App

This is a web application built using Next.js and React that allows users to submit reviews, analyze their sentiment, and vote on them. The sentiment analysis is performed using the Hugging Face sentiment analysis model through an API route. Users can upvote or downvote reviews based on their preference.

## Table of Contents

- [Sentiment Analysis and Review Voting App](#sentiment-analysis-and-review-voting-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
- [Sentiment Analysis and Review Voting App](#sentiment-analysis-and-review-voting-app-1)
  - [Getting Started](#getting-started)
  - [API Route](#api-route)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User-friendly interface for submitting reviews and analyzing their sentiment.
- Real-time sentiment analysis using the Hugging Face sentiment analysis model.
- Review voting system to express approval or disapproval.
- Toggle review input to declutter the interface.
- Dynamic sorting of reviews based on vote count.
- Responsive design for different screen sizes.

  
## Installation

1. Clone the repository or download the ZIP file.

```bash
Navigate to the project directory.
git clone https://github.com/RajGM/ethicaAi.git

Install the dependencies.
cd sentiment-analysis-app

Install the dependencies.
npm install

Add API keys to .env.local file

Run the development server.
npm run dev

Open your web browser and visit http://localhost:3000 to access the application.

Enter a review in the textarea, click "Analyze" to determine its sentiment, and vote on reviews.
```

# Sentiment Analysis and Review Voting App

Welcome to the Sentiment Analysis and Review Voting App! This web application is built using Next.js and React, allowing users to submit reviews, analyze their sentiment, and vote on them. The sentiment analysis is powered by the Hugging Face sentiment analysis model through an API route.

## Getting Started

1. Open your web browser and visit `http://localhost:3000` to access the application.

2. Enter a review in the provided textarea.

3. Click the "Analyze" button to determine the sentiment of the review.

4. You can also vote on existing reviews by using the upvote and downvote buttons.

## API Route

The sentiment analysis functionality is provided by an API route located at `/pages/api/analyze.js`. This route handles the sentiment analysis using the Hugging Face sentiment analysis model.

For more detailed information about the API route's functionality, refer to the code comments in the `analyze.js` file.

## Technologies Used

The app leverages the following technologies:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hugging Face Model](https://huggingface.co/models)

## Contributing

Contributions are highly appreciated! If you come across any issues or have suggestions for improvements, please don't hesitate to:

- Create a pull request
- Submit an issue

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
