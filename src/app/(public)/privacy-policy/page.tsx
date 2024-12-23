import { H2, H4 } from '@/components/typography'
import { data } from '@/data/privacy-policy'

const page = () => {
  return (
    <div className="space-y-4 py-10 xl:container">
      <H2>Privacy Policy</H2>
      <p className="pt-2">
        At Consult Advance Education Consultancy Pvt. Ltd., we prioritize the
        privacy and security of our customers and website visitors. This privacy
        policy outlines how we collect, use, and protect your information when
        you use our website.
      </p>
      {data.map((d, idx) => (
        <div className="space-y-2" key={idx}>
          <H4>{d.title}</H4>
          <p>{d.value}</p>
        </div>
      ))}

      <div className="space-y-4">
        <H4>Copyright Statement</H4>
        <p>
          All content on this website, including text, images, and logos, is the
          property of Consult Advance Education Consultancy Pvt. Ltd.
          Unauthorized use, reproduction, or distribution of this content, in
          part or in whole, is strictly prohibited without prior written
          permission from Consult Advance Education Consultancy Pvt. Ltd.
        </p>

        <p className="pt-8 text-center text-sm">
          © 2024 Consult Advance Education Consultancy Pvt. Ltd. All rights
          reserved.
        </p>
      </div>
    </div>
  )
}

export default page
