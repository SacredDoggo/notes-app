import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  id: Id<"documents">;
  ogTitle: string;
  preview?: boolean;
}

export const Navbar = ({ id, ogTitle, preview }: NavbarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(ogTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    setTitle(ogTitle);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  }

  const disableInput = () => setIsEditing(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: id,
      title: event.target.value || "Untitled"
    });
  }

  return (
    <div className="flex p-2 w-full justify-between">
      <div className="font-medium">
        {!isEditing ?
          (
            <Button
              variant="ghost"
              onClick={enableInput}
            >
              {ogTitle}
            </Button>
          ) : (
            <Input
              ref={inputRef}
              value={title}
              placeholder="Untitled"
              onBlur={disableInput}
              onChange={handleChange}
              className="focus-visible:ring-transparent bg-secondary"
            />
          )
        }
      </div>
    </div>
  );
}