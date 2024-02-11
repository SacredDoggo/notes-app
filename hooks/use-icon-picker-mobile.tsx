import { create } from "zustand";

type IconPickerStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useIconPicker = create<IconPickerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));