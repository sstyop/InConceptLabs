import { ReactNode, memo } from "react"

type ButtonProps = {
  children: ReactNode,
  onClick?: () => void,
  className?: string,
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = memo(({ children, className, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
})