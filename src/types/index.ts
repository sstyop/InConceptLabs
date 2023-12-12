import { Option } from "react-dropdown";

export interface Question {
  type: string,
  difficulty: Difficulty,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[];
}

export type QuestionCategory = {
  id: number;
  name: string;
}

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface QuizRecord {
  selectedAnswers: string[];
  questions: Question[] | null;
  selectedCategory: Option | undefined;
  correctAnswers: number;
}