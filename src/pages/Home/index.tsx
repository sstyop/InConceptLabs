import { useCallback, useEffect, useState } from "react";
import { getAllCategories, getCategorizedQuestions } from "../../api";
import { ArrowDown, AnswerButton, Button, Spinner, ThankYouBlock } from "../../components";
import { AMOUNT_OF_QUESTIONS } from "../../helpers/constants";
import { decodeHTMLEntities, shuffleArray, capitalizeFirstLetter } from "../../helpers/utils";
import { QuestionCategory, Question, QuizRecord } from "../../types";
import Dropdown, { Option } from 'react-dropdown';

export const Home = () => {
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [animationName, setAnimationName] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === AMOUNT_OF_QUESTIONS) {
      // Storing current ended quiz results in localStorage
      const currentQuizRecord = {
        selectedAnswers,
        questions,
        selectedCategory,
        correctAnswers: correctAnswers.length,
      }

      const quizzes = localStorage.getItem("Quizzes");
      if (quizzes) {
        const quizzesArr: QuizRecord[] = JSON.parse(quizzes);
        quizzesArr.push(currentQuizRecord);
        localStorage.setItem("Quizzes", JSON.stringify(quizzesArr));
      } else {
        const quizzesArr: QuizRecord[] = [currentQuizRecord];
        localStorage.setItem("Quizzes", JSON.stringify(quizzesArr));
      }
    }
  }, [correctAnswers.length, currentQuestionIndex, questions, selectedAnswers, selectedCategory])

  const handleCategoryQuestionsFetching = async () => {
    setIsLoading(true);
    const response = await getCategorizedQuestions(AMOUNT_OF_QUESTIONS, Number(selectedCategory?.value))
    setQuestions(response);
    setIsLoading(false);
  }

  const storeCategories = useCallback(() => {
    const dropdownOptions = categories?.map((category: QuestionCategory) => ({
      value: category.id.toString(),
      label: category.name,
      className: 'py-2 px-4 text-lg text-blue rounded-lg cursor-pointer transition-all min-lg:hover:text-green min-lg:hover:bg-milky-gray'
    }));

    return (
      <Dropdown
        options={dropdownOptions}
        className="relative w-80 group z-10"
        menuClassName="w-full h-56 p-2.5 mt-2 absolute top-full bg-milky-white rounded-md shadow-md	overflow-y-auto"
        controlClassName={`flex items-center justify-between py-3 px-4 border-2 border-drp rounded-2xl transition-all cursor-pointer min-lg:hover:border-drp-hover group-[.is-open]:border-drp-active ${selectedCategory ? 'border-drp-selected' : ''}`}
        placeholder="Select a category"
        placeholderClassName={selectedCategory ? 'text-blue' : 'text-placeholder'}
        onChange={category => setSelectedCategory(category)}
        arrowClosed={<ArrowDown color={selectedCategory ? '#354153' : '#9EA0A4'} className="ml-2 transition-all" />}
        arrowOpen={<ArrowDown color={selectedCategory ? '#354153' : '#9EA0A4'} className="ml-2 rotate-180 transition-all" />}
        value={selectedCategory}
      />
    )
  }, [categories, selectedCategory]);

  const storeSingleQuestion = useCallback(() => {
    const question = questions![currentQuestionIndex];
    let allAnswers = [...question.incorrect_answers, question.correct_answer];

    const handleAnswerClick = (value: string) => {
      const isCorrectAnswer = decodeHTMLEntities(value) === decodeHTMLEntities(question.correct_answer);
      setCorrectAnswers(prevCorrectAnswers => isCorrectAnswer ? [...prevCorrectAnswers, value] : prevCorrectAnswers);
      setSelectedAnswers(prevSelectedAnswers => [...prevSelectedAnswers, value]);
      setAnimationName("animate-fade-in-out");

      if (currentQuestionIndex < AMOUNT_OF_QUESTIONS) {
        setTimeout(() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setTimeout(() => setAnimationName(""), 500);
          allAnswers = shuffleArray(allAnswers);
        }, 500);
      }
    };

    return (
      <div className={`w-full flex flex-col items-center px-16 xl:px-10 md:!px-6 origin-top	${animationName}`}>
        <h2 className="text-5xl text-green font-bold md:text-3xl">Question {currentQuestionIndex + 1}</h2>
        <div className={`bg-status-${question.difficulty} mt-8 text-base text-white px-5 py-2 rounded-lg rounded-tr-none md:mt-6 md:text-sm`}>{capitalizeFirstLetter(question.difficulty)}</div>
        <h4 className="my-16 text-3xl text-blue text-center font-bold md:my-10 md:text-xl">{decodeHTMLEntities(question.question)}</h4>
        <div className="w-full flex justify-center items-center flex-wrap	items-stretch md:flex-col">
          {allAnswers.map((answer: string, index: number) => (
            <AnswerButton key={answer + index} onClick={handleAnswerClick} value={decodeHTMLEntities(answer)} />
          ))}
        </div>
      </div>
    );
  }, [animationName, currentQuestionIndex, questions]);

  const handleBackToHome = useCallback(() => {
    setSelectedCategory(undefined);
    setIsLoading(false);
    setQuestions(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setCorrectAnswers([]);
    setAnimationName("");
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[100vh] relative min-lg:mt-20 ">
      <div className={`flex flex-col items-center absolute top-1/2 -translate-y-1/2  ${!!questions ? "animate-fade-out pointer-events-none" : ""}`}>
        <h1 className="text-5xl font-bold	text-green md:text-3xl">Trivia App</h1>
        <h3 className="text-3xl font-bold	text-blue my-20 md:text-xl md:my-8">Pick a Category</h3>
        {storeCategories()}
        <Button onClick={handleCategoryQuestionsFetching} className="flex items-center self-center py-4 px-14 text-lg mt-24 bg-green rounded-2xl transition-all text-white min-lg:hover:bg-dark-green disabled:bg-milky-white disabled:text-gray md:mt-12" disabled={!selectedCategory}>
          {isLoading ? <><Spinner color="#3A7859" railRoadColor="#E7EBF1" />Loading</> : "Start"}
        </Button>
      </div>
      {!isLoading && !!questions && (currentQuestionIndex !== AMOUNT_OF_QUESTIONS) && (storeSingleQuestion())}
      {currentQuestionIndex === AMOUNT_OF_QUESTIONS && (
        <ThankYouBlock
          handleResetClick={handleBackToHome}
          correctAnswers={correctAnswers.length}
          totalQuestions={AMOUNT_OF_QUESTIONS}
        />
      )
      }
    </div>
  );
}

export default Home;