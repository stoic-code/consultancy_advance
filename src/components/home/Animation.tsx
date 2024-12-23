'use client'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import animation2 from '@/data/lottie/ZburgW8RY7.json'
// import animation3 from '@/data/lottie/eg2ZdUDWPA.json'
// import animation1 from '@/data/lottie/4wLFnir3jz.json'
import dynamic from 'next/dynamic'

const Animation = () => {
  return (
    <div className="hidden min-h-[300px] place-items-center md:grid">
      <Lottie animationData={animation2} loop />
    </div>
  )
}

export default Animation
