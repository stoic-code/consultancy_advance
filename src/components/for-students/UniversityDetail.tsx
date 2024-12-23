import { GraduationCap, Pencil } from 'lucide-react'

export function UniDetail({ uni }: { uni: any }) {
  console.log(uni)
  return (
    <div>
      <div className="">
        <div
          style={{
            backgroundImage: uni.cover_image
              ? `url(${uni.cover_image.secure_url})`
              : 'url(https://eastasiaforum.org/wp-content/uploads/2024/04/2023-11-16T000601Z_830547260_RC2ZD4A72G4F_RTRMADP_3_SOUTHKOREA-EXAM-1024x683.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className="group relative h-[20vh] sm:h-[30vh] md:h-[50vh]"
        ></div>
      </div>
      <div className=" relative space-y-4   px-4 pt-12 2xl:container lg:px-20">
        <div className="  absolute bottom-4 left-8 z-10 bg-white  shadow-xl sm:-top-32 md:left-20 ">
          {!uni?.profile_image?.secure_url ? (
            <div className="mx-auto grid  h-20   w-20  place-items-center text-muted-foreground  sm:h-40 sm:w-36">
              <GraduationCap strokeWidth={1} size={100} />
            </div>
          ) : (
            <div className="p-2">
              <div
                className=" group h-20 w-20 bg-no-repeat sm:h-40 sm:w-36"
                style={{
                  background: `url(${uni?.profile_image?.secure_url}) center/contain no-repeat`,
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
