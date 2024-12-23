import { FadeIn } from '../Fade'
import { H2 } from '../typography'

export const GlobalPresence = () => {
  return (
    <FadeIn className="flex flex-col items-center justify-center gap-10 pt-20">
      <H2 className="text-center">
        Global <span className="text-green-500">Presence</span> For Global{' '}
        <span className="text-blue-500">Recruitment</span>
      </H2>
      <img
        src="/for-partners/map.webp"
        alt="map of the world"
        height={700}
        width={1000}
      />
    </FadeIn>
  )
}
