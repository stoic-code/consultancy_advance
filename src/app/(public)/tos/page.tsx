import { H2, H4 } from '@/components/typography'
import { data } from '@/data/tos'

const page = () => {
  return (
    <div className="space-y-4 py-10 xl:container">
      <H2>Terms And Contiditons</H2>
      <p className="pt-2">
        These terms and conditions ("Agreement") govern the use of the Global
        Connect Education Consultancy Pvt. Ltd. website ("Website" or "Service")
        and its related products and services (collectively, "Services"). By
        accessing and using the Website and Services, you acknowledge that you
        have read, understood, and agreed to be bound by the terms of this
        Agreement. If you are accessing this Agreement on behalf of a business
        or entity, you affirm that you have the authority to bind such entity to
        these terms. If you do not have such authority or do not agree with
        these terms, you must refrain from using the Website and Services.
      </p>
      {data.map((d, idx) => (
        <div className="space-y-2" key={idx}>
          <H4>{d.title}</H4>
          <p>{d.value}</p>
        </div>
      ))}
    </div>
  )
}

export default page
