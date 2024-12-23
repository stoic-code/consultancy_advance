import { FadeIn, FadeInStagger } from "../Fade";
import { H2, H3, H4, H5, P } from "../typography";
import { cn } from "@/lib/utils";
import { support } from "./data";

export const Support = () => {
  return (
    <div className="px-4 py-10 2xl:container">
      <FadeIn>
        <H2 className="text-center">
          How We <span className="text-blue-600">Support</span> You{" "}
          <span className="text-destructive">?</span>
        </H2>
      </FadeIn>

      <div className="space-y-20 pt-20 md:px-10">
        {support.map((d, idx) => (
          <>
            <FadeIn>
              <H3
                className={cn(
                  "flex items-center gap-4 font-medium",
                  idx % 2 !== 0 ? "justify-end" : "",
                )}
              >
                <img
                  src="/for-students/star.svg"
                  alt=""
                  height={50}
                  width={50}
                />
                {d.title}
              </H3>
            </FadeIn>
            <div key={idx} className="grid md:grid-cols-2">
              <FadeIn
                className={cn(
                  "flex w-full items-center p-10",
                  idx % 2 ? "order-2" : "",
                )}
                style={{
                  background:
                    "url(/for-students/counsel-bg.svg) no-repeat right/100%",
                }}
              >
                <img src={d.image} alt={d.title} height={500} width={500} />
              </FadeIn>
              <FadeInStagger className="order-2 space-y-10 md:order-1">
                {d.sub.map((s, idx) => (
                  <FadeIn key={idx} className="flex gap-4">
                    <div className="shadow-inside grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border bg-white">
                      <img src={s.icon} alt="" height={30} width={30} />
                    </div>
                    <div className="space-y-2">
                      <H5 className="border-b">{s.title}</H5>
                      <P className="text-muted-foreground">{s.desc}</P>
                    </div>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
