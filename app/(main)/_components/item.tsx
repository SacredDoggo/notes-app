import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { LucideIcon, Trash } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

interface ItemProps {
  active?: boolean;
  icon: LucideIcon;
  title: string;
  document?: boolean;
  documentIcon?: string;
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
  documentIcon,
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
        "group/docs flex pl-3 hover:bg-primary/5 min-h-7 justify-between items-center w-full text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      <div
        className="flex text-sm font font-medium max-w-[75%]"
      >
        {documentIcon ? (
          <span className="shrink-0 text-[18px] mr-2">{documentIcon}</span>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}
        <span className="truncate">
          {title}
        </span>
      </div>
      {document && (
        <div className="flex pr-2">
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