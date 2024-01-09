import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <p className="hidden md:block">Logo</p>
      <div className="dark:bg-[#1F1F1F] flex w-full items-center justify-between md:justify-end gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">Privacy Policy</Button>
        <Button variant="ghost" size="sm">Terms & Conditions</Button>
      </div>
    </div>
  );
};