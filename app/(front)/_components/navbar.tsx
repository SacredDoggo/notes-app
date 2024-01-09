import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return ( 
    <div className="top-0 fixed w-full z-50 bg-background flex justify-between p-6 items-center dark:bg-[#1F1F1F]">
      Logo
      <div className="flex gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
}
