import Link from 'next/link'

const AccomodationDetailsTab = ({ id }: { id: string }) => {
  const tabs = [
    {
      title: 'Overview',
      href: `/for-students/accomodations/${id}/?tab=overview`,
    },
    {
      title: 'Room Types',
      href: `/for-students/accomodations/${id}/?tab=rooms`,
    },
    {
      title: 'Payment Info',
      href: `/for-students/accomodations/${id}/?tab=payment`,
    },
    {
      title: 'Location',
      href: `/for-students/accomodations/${id}/?tab=location`,
    },
  ]

  return (
    <div className="flex gap-4 rounded-b-xl bg-white px-20 py-2 shadow-xl">
      {tabs.map((t, idx) => (
        <Link href={t.href} key={idx}>
          {t.title}
        </Link>
      ))}
    </div>
  )
}

export default AccomodationDetailsTab
