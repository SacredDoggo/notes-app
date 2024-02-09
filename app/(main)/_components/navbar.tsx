import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuIcon } from "lucide-react";
import { Banner } from "./banner";

interface NavbarProps {
  id: Id<"documents">;
  isCollapsed: boolean;
  onResetSidebar: () => void;
}

export const Navbar = ({ id, isCollapsed, onResetSidebar }: NavbarProps) => {
  const document = useQuery(api.documents.getById, { documentId: id });
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document?.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const enableInput = () => {
    setTitle(document?.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: id,
      title: event.target.value || "Untitled"
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <>
      <nav className="px-3 py-2 w-full flex items-center gap-x-4 bg-background dark:bg-[#1F1F1F]">
        <div className="font-medium p-2 flex items-center gap-x-2">
          {isCollapsed && (
            <MenuIcon
              onClick={onResetSidebar}
              className="h-6 w-6 text-muted-foreground shrink-0"
            />
          )}
          {!isEditing ?
            (
              <Button
                variant="ghost"
                onClick={enableInput}
              >
                {document?.title}
              </Button>
            ) : (
              <Input
                ref={inputRef}
                value={title}
                placeholder="Untitled"
                onKeyDown={onKeyDown}
                onBlur={disableInput}
                onChange={handleChange}
                className="focus-visible:ring-transparent bg-secondary"
              />
            )
          }
        </div>
      </nav>
      {!!document?.isArchived && (
        <Banner id={document._id} />
      )}
    </>
  );
}