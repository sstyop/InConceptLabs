import { useCallback, useEffect, useState } from "react";
import { QuizRecord } from "../../types";
import { AMOUNT_OF_QUESTIONS } from "../../helpers/constants";
import { capitalizeFirstLetter, decodeHTMLEntities } from "../../helpers/utils";

export const ScoreBoard = () => {
  const [usedAnswers, setUserAnswers] = useState<QuizRecord[]>([]);

  useEffect(() => {
    const storedUserAnswers = localStorage.getItem('Quizzes');
    if (storedUserAnswers) setUserAnswers(JSON.parse(storedUserAnswers));
  }, []);

  const storeScoreBoardRows = useCallback(() => {
    return usedAnswers.map((quiz, index) => {
      return (
        <div key={index} className={`flex flex-col mb-10 border-4 ${((quiz.correctAnswers * 100) / AMOUNT_OF_QUESTIONS) > 50 ? 'border-teal-700' : 'border-rose-400'}`}>
          <div className="flex p-3 md:flex-col">
            <p className="mr-6 text-blue font-bold"><span className="text-dark-green font-normal">Category:</span> {quiz.selectedCategory?.label}</p>
            <p className="mr-6 text-blue font-bold md:my-2"><span className="text-dark-green font-normal">Score:</span> {quiz.correctAnswers}/{AMOUNT_OF_QUESTIONS}</p>
            <p className="mr-6 text-blue font-bold"><span className="text-dark-green font-normal">Percentage:</span> {(quiz.correctAnswers * 100) / AMOUNT_OF_QUESTIONS}%</p>
          </div>
          <div className="flex flex-wrap p-1">{quiz.questions?.map((question, index) => {
            return (
              <div className={`flex flex-col border-4 border-drp w-1/5 p-3 lg:w-1/2 md:!w-full ${quiz.selectedAnswers[index] === question.correct_answer ? 'bg-teal-700	 text-white' : 'bg-rose-400 text-blue'}`} key={index}>
                <div className="flex items-center mb-2">
                  <p className="text-sm mr-2">Difficulty</p>
                  <div className={`bg-status-${question.difficulty} w-fit text-xs text-white px-2.5 py-1 rounded-lg rounded-tr-none `}>{capitalizeFirstLetter(question.difficulty)}</div>
                </div>
                <p className="text-sm">Question</p>
                <p className='text-xs mb-2 font-bold'>{decodeHTMLEntities(question.question)}</p>
                <p className="text-sm">Your Answer</p>
                <p className={`text-xs mb-2 font-bold`}>{decodeHTMLEntities(quiz.selectedAnswers[index])}</p>
                <p className="text-sm">Correct Answer</p>
                <p className="text-xs font-bold">{decodeHTMLEntities(question.correct_answer)}</p>
              </div>
            )
          })}</div>
        </div>
      )
    })
  }, [usedAnswers])


  return (
    <div className="p-6 flex flex-col">
      <h1 className="text-3xl mb-10 text-blue">Your ScoreBoard</h1>
      {storeScoreBoardRows()}
    </div>
  )
}