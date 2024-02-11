"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
import { ImageDropzoneModal } from "@/components/modals/upload-image-modal";
import { IconPickerModal } from "@/components/modals/icon-picker-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <ImageDropzoneModal />
      <IconPickerModal />
    </>
  )
}