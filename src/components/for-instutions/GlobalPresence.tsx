import { FadeIn, FadeInStagger } from '../Fade'
import { H2, H5, P } from '../typography'

const data = [
  {
    icon: '/for-instutions/icons/phonemsg.webp',
    color: 'red',
    title: 'Increase Student Diversity',
    desc: 'Enriching campus culture through global student representation.',
  },
  {
    icon: '/for-instutions/icons/mega.webp',
    color: 'green',
    title: 'Receive Quality Applicants',
    desc: 'Elevating admissions standards with vetted student applications.',
  },
  {
    icon: '/for-instutions/icons/statistics.webp',
    color: 'blue',
    title: 'Approved Recruiter Network',
    desc: 'Partnering with trusted recruiters for successful student placements.',
  },
  {
    icon: '/for-instutions/icons/startup.webp',
    color: 'yellow',
    title: 'Document Verification',
    desc: 'Ensuring authenticity and security through rigorous document verification.',
  },
  {
    icon: '/for-instutions/icons/funnelpic.webp',
    color: 'indigo',
    title: 'Promotional Channels ',
    desc: 'Amplifying outreach efforts through diverse promotional platforms.',
  },
  {
    color: 'orange',
    icon: '/for-instutions/icons/assignmentpic.webp',
    title: 'Applicant Matching',
    desc: 'Connecting students with tailored opportunities for academic success.',
  },
]

export const GlobalPresence = () => {
  return (
    <div
      id="how-it-works"
      style={{
        background:
          '#E7F9FF url(/for-instutions/world-wide.webp) no-repeat right 90%/40%',
      }}
      className="py-10 2xl:container"
    >
      <FadeIn>
        <H2 className="mx-auto max-w-3xl py-10 text-center">
          Expand your <span className="text-green-500">Global</span> presence
          and attract top talent worldwide through{' '}
          <span className="text-pink-500">Consult Advance&apos;s</span>{' '}
          platform.
        </H2>
      </FadeIn>

      <FadeInStagger>
        <div className="mx-auto grid place-items-center gap-y-10 py-10 md:grid-cols-2 lg:w-4/5 xl:grid-cols-3">
          {data.map((d, idx) => (
            <FadeIn>
              <div
                key={idx}
                className="max-w-[300px] space-y-3 rounded-xl bg-white p-4 shadow-xl"
              >
                <div className="aspect-square     w-fit rounded-full bg-blue-100  p-4 ">
                  <img
                    className="   aspect-square object-contain  "
                    src={d.icon}
                    alt={d.title}
                    width={50}
                    height={50}
                  />
                </div>
                <H5>{d.title}</H5>
                <P className="text-muted-foreground">{d.desc}</P>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </div>
  )
}
