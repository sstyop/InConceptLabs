import { memo } from "react"

type ArrowProps = {
  color?: string,
  className?: string
}

export const ArrowDown: React.FC<ArrowProps> = memo(({ color = '#9EA0A4', className }) => {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.7925 7.86499L11 12.0725L15.2075 7.86499L16.5 9.16666L11 14.6667L5.5 9.16666L6.7925 7.86499Z" fill={color} />
    </svg>
  )
})