import React, { useState } from "react";
import { Button } from "./ui/button";

const QuizGame: React.FC = ({ saveScore }: any) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is 3 + 5?", answer: "8" },
    { question: "What is 7 + 6?", answer: "13" },
  ];

  const handleAnswer = (userAnswer: string) => {
    const correctAnswer = questions[questionIndex].answer;
    if (userAnswer === correctAnswer) {
      setScore(score + 10); // Increment score for correct answer
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      saveScore(score);
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl">{questions[questionIndex].question}</h2>
      <Button onClick={() => handleAnswer("4")} className="mt-4">4</Button>
      <Button onClick={() => handleAnswer("8")} className="mt-4">8</Button>
      <Button onClick={() => handleAnswer("13")} className="mt-4">13</Button>
    </div>
  );
};

export default QuizGame;
