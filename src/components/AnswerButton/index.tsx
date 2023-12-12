import { memo } from "react"

type AnswerButtonProps = {
  value: string,
  onClick: (answer: string) => void,
  disabled?: boolean
}

export const AnswerButton: React.FC<AnswerButtonProps> = memo(({ value, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className="px-16 py-4 mx-3 mb-3 border-2 border-drp-active text-blue font-bold text-lg flex-1 rounded-2xl bg-transparent transition-all min-lg:hover:text-dark-green min-lg:hover:border-transparent min-lg:hover:bg-light-green xl:w-[calc(50%-1.5rem)] xl:px-10 md:!w-full md:mx-0 md:text-base"
      disabled={disabled}>
      {value}
    </button>
  )
});