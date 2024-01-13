import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { LucideIcon, Trash } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

interface ItemProps {
  active?: boolean;
  icon: LucideIcon;
  title: string;
  document?: boolean;
  documentId?: Id<"documents">;
  onClick?: () => void;
  onArchive?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSearch?: boolean;
}

export const Item = ({
  active,
  icon: Icon,
  title,
  document,
  documentId,
  onClick,
  onArchive,
  isSearch
}: ItemProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "group/docs flex pl-3 hover:bg-primary/5 min-h-7 items-center w-full",
        active && "bg-primary/5"
      )}

    >
      <div
        className="flex"
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
      {document && (
        <div className="flex w-full justify-end pr-2">
          <div
            role="button"
            onClick={onArchive}
            className={cn(
              "opacity-0 group-hover/docs:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1 rounded-sm",
              isMobile && "opacity-100"
            )}
          >
            <Trash className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}