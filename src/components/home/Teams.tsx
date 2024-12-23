'use client'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { P } from '../typography'
const PersonCard = () => {
  return (
    <div className="flex h-[250px] w-[250px] flex-col rounded-xl bg-blue-800 text-white">
      <div
        className="flex-1 rounded-xl"
        style={{
          backgroundImage:
            'url(https://media.istockphoto.com/id/1197071216/photo/portrait-of-a-smart-and-handsome-it-specialist-wearing-glasses-smiles-behind-him-personal.jpg?s=612x612&w=0&k=20&c=Dy8TjvDmeXWhR6gAZ_OuqLu3ytUJmtycEYdVQenpWoI=)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className="self-end px-4 py-2">
        <h3 className="font-bold">Aashish Thapa</h3>
        <h3>
          President @<span className="font-semibold">Metalogic</span>
        </h3>
      </div>
    </div>
  )
}

const Teams = () => {
  const scrollLeft = () => {
    const container = document.getElementById('team_container')
    if (container) {
      container.scrollLeft += 300
    }
  }

  const scrollRight = () => {
    const container = document.getElementById('team_container')
    if (container) {
      container.scrollLeft -= 300
    }
  }

  return (
    <section className="mx-auto xl:container">
      <div className="grid grid-cols-1 px-8 py-8 lg:grid-cols-4">
        <div className="px-2 py-4">
          <P className="font-semibold text-red-500">Featured</P>
          <h4 className="text-5xl font-bold">
            Meet <br /> <span className="text-primary">Our Team</span>
          </h4>
          <p>Behold our incredble core team taking the world of storm !</p>
        </div>

        <div className="relative col-span-3">
          <button
            className="absolute left-[-5px] top-[50%] rounded-full bg-primary p-2 text-white"
            onClick={scrollRight}
          >
            <ChevronLeft />
          </button>

          <button
            className="absolute right-[-5px] top-[50%] rounded-full bg-primary p-2 text-white"
            onClick={scrollLeft}
          >
            <ChevronRight />
          </button>
          <div
            id="team_container"
            className="scrollbar-none text-ui-600 flex gap-12 overflow-x-scroll scroll-smooth whitespace-nowrap px-2"
          >
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Teams
