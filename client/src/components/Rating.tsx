import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

type Props = {
  rating: number | undefined
  className:string
}

const Rating = ({ rating, className }: Props) => {
  const validRating = typeof rating === 'number' && !isNaN(rating) ? Math.min(Math.max(rating, 0), 5) : 0;

  const full = Math.floor(validRating)
  const half = validRating % 1
  const zero = 5 - full - (half ? 1 : 0)
  const safeZero = Math.max(zero, 0);

  return (
    <div className={className}>
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <FaStar key={i} className="text-yellow-500" />
      ))}
      {half ? <FaStarHalfAlt className="text-yellow-500" /> : null}
      {[...Array(safeZero)].map((_, i) => (
        <FaRegStar key={full + i + 1} className="text-yellow-500" />
      ))}
    </div>
    </div>
  )
}

export default Rating
