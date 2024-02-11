"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useMutation } from "convex/react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useIconPicker } from "@/hooks/use-icon-picker-mobile";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const IconPickerModal = () => {
  const params = useParams();
  const iconPicker = useIconPicker();
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const update = useMutation(api.documents.update);

  const handleUpdateIcon = (data: string) => {
    if (params.documentId) {
      update({
        id: params.documentId as Id<"documents">,
        icon: data
      });
    }
    iconPicker.onClose();
  };

  const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT
  }

  const theme = themeMap[currentTheme];

  return (
    <Dialog open={iconPicker.isOpen} onOpenChange={iconPicker.onClose}>
      <DialogContent>
        <div className="flex items-center justify-center">
          <EmojiPicker
            theme={theme}
            onEmojiClick={(data) => handleUpdateIcon(data.emoji)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}