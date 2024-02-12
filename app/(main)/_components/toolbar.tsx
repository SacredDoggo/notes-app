"use client";

import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import { ImageIcon, SmileIcon, X } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"

import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";

import { useImageDropzone } from "@/hooks/use-image-dropzone";


interface ToolbarProps {
  id: Id<"documents">;
  icon?: string;
  initialTitle: string;
  coverImageUrl?: string;
}

export const Toolbar = ({ id, icon, initialTitle, coverImageUrl }: ToolbarProps) => {
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const imageDropzone = useImageDropzone();

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialTitle);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setTitle(value);
    update({
      id: id,
      title: value || "Untitled"
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const handleIconChange = (icon: string) => {
    update({
      id: id,
      icon: icon
    });
  };

  const handleRemoveIcon = () => {
    removeIcon({
      id: id,
    });
  };

  const handleCoverImageUpload = () => {
    imageDropzone.onOpen();
  };

  return (
    <div className="group relative pl-[54px]">
      <div className="py-3 group/icon">
        {icon ? (
          <div className="flex py-5 items-center">
            <IconPicker onIconSelect={handleIconChange}>
              <span className="text-6xl hover:opacity-75 transition">{icon}</span>
            </IconPicker>
            {!isMobile && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveIcon}
                className="opacity-0 group-hover/icon:opacity-100 text-xs rounded-full text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <IconPicker asChild onIconSelect={handleIconChange}>
            <Button
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition text-xs text-muted-foreground"
            >
              <SmileIcon className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!coverImageUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCoverImageUpload}
            className="opacity-0 group-hover:opacity-100 transition text-xs text-muted-foreground"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>
      {!isEditing ? (
        <div
          role="button"
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialTitle}
        </div>
      ) : (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none w-full"
        />
      )}
    </div>
  )
}