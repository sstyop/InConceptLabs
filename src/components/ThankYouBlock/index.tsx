import { Button } from "../Button"

type ThankYouBlockProps = {
  correctAnswers: number,
  totalQuestions: number,
  handleResetClick: () => void,
}

export const ThankYouBlock: React.FC<ThankYouBlockProps> = ({ correctAnswers, totalQuestions, handleResetClick }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold	text-green md:text-3xl">Thank you</h1>
      <p className="text-3xl text-blue font-bold mt-8 md:text-xl">Your score : {correctAnswers} / {totalQuestions}</p>
      <Button onClick={handleResetClick} className="flex items-center self-center py-4 px-14 text-lg mt-10 bg-green rounded-2xl transition-all text-white hover:bg-dark-green">Back to home</Button>
    </div>
  )
}