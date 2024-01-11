import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ItemProps {
  active?: boolean;
  icon: LucideIcon;
  title: string;
  documentId?: Id<"documents">;
  onClick: () => void;
  isSearch?: boolean;
}

export const Item = ({
  active,
  icon: Icon,
  title,
  documentId,
  onClick,
  isSearch
}: ItemProps) => {
  return (
    <div 
      className={cn(
        "flex pl-3 hover:bg-primary/5 min-h-7 items-center w-full",
        active && "bg-primary/5"
      )}
      role="button"
      onClick={onClick}
    >
      <Icon className="h-[18px] text-muted-foreground" />
      <span 
        className={cn(
          "text-sm pl-2 font-medium",
          !active && "text-muted-foreground"
        )}
      >
        {title}
      </span>
    </div>
  );
}