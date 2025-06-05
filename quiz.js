const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let quiz = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  }
];

// Get all quiz questions (without answers)
app.get('/quiz', (req, res) => {
  const quizWithoutAnswers = quiz.map(({ answer, ...rest }) => rest);
  res.json(quizWithoutAnswers);
});

// Submit answers
app.post('/submit', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;

  quiz.forEach((q, index) => {
    if (userAnswers[q.id] === q.answer) {
      score++;
    }
  });

  res.json({ message: "Quiz submitted", score, total: quiz.length });
});

app.listen(PORT, () => {
  console.log(`Quiz app running at http://localhost:${PORT}`);
});
