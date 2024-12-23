import { cn } from "@/lib/utils";

const HamMenu = ({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className={cn(
        "my-2 flex h-[24px] w-6 cursor-pointer flex-col gap-[5px]",
        className,
      )}
    >
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "translate-y-2 -rotate-45"}`}
      ></div>
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "opacity-0"}`}
      ></div>
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "-translate-y-2 rotate-45"}`}
      ></div>
    </div>
  );
};

export default HamMenu;
