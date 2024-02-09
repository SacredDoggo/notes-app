"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

interface IconPickerProps {
  asChild?: boolean;
  children: React.ReactNode;
  onIconSelect: (emoji: string) => void;
}

export const IconPicker = ({ asChild, children, onIconSelect }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;
  
  const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT
  }

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
        height={350}
          theme={theme}
          onEmojiClick={(data) => onIconSelect(data.emoji)} 
        />
      </PopoverContent>
    </Popover>
  );
}