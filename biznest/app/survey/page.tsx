"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// Вопросы для опроса
const questions = [
  {
    id: 1,
    question: "What is your primary interest in technology?",
    options: ["AI/ML", "Web Development", "Mobile Apps", "Blockchain", "Other"],
    allowMultiple: true,
    allowCustom: true,
  },
  {
    id: 2,
    question: "What stage is your startup in?",
    options: ["Idea", "MVP", "Early Growth", "Scaling", "Not a startup"],
    allowMultiple: false,
  },
  {
    id: 3,
    question: "What resources do you need most?",
    options: [
      "Funding",
      "Mentorship",
      "Technical Support",
      "Office Space",
      "Networking",
    ],
    allowMultiple: true,
  },
  {
    id: 4,
    question: "Your preferred way of learning?",
    options: [
      "Online Courses",
      "Workshops",
      "One-on-One Mentoring",
      "Books",
      "Practice",
    ],
    allowMultiple: true,
  },
  {
    id: 5,
    question: "What is your experience level?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"],
    allowMultiple: false,
  },
];

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [customAnswer, setCustomAnswer] = useState("");

  // Функция для отправки ответов на сервер
  const saveResponses = async (questionId: number, answers: string[]) => {
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save response");
      }

      const data = await response.json();
      console.log("Response saved:", data);
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  // Обработка выбора ответа
  const handleAnswer = async (option: string) => {
    const questionId = questions[currentQuestion].id;
    const currentAnswers = answers[questionId] || [];

    let newAnswers;
    if (questions[currentQuestion].allowMultiple) {
      newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((a) => a !== option)
        : [...currentAnswers, option];
    } else {
      newAnswers = [option];
    }

    setAnswers({ ...answers, [questionId]: newAnswers });

    // Отправляем ответы на сервер
    await saveResponses(questionId, newAnswers);

    // Переход к следующему вопросу (если не разрешено множественное выделение)
    if (
      !questions[currentQuestion].allowMultiple &&
      currentQuestion < questions.length - 1
    ) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    }
  };

  // Обработка кастомного ответа
  const handleCustomAnswer = async () => {
    if (customAnswer.trim()) {
      const questionId = questions[currentQuestion].id;
      const newAnswers = [...(answers[questionId] || []), customAnswer.trim()];

      setAnswers({
        ...answers,
        [questionId]: newAnswers,
      });
      setCustomAnswer("");

      // Отправляем кастомный ответ на сервер
      await saveResponses(questionId, newAnswers);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto pt-20 px-4"
        >
          <Card className="p-8">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  % completed
                </span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div
                  className="bg-green-600 h-1 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <Button
                  key={option}
                  variant={
                    answers[questions[currentQuestion].id]?.includes(option)
                      ? "default"
                      : "outline"
                  }
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}

              {questions[currentQuestion].allowCustom && (
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Other (please specify)"
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleCustomAnswer()
                    }
                  />
                  <Button onClick={handleCustomAnswer}>Add</Button>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(questions.length - 1, currentQuestion + 1)
                  )
                }
                disabled={currentQuestion === questions.length - 1}
              >
                Next
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
