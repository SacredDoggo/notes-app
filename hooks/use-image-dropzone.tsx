import { create } from "zustand";

type SearchStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string | undefined) => void;
}

export const useImageDropzone = create<SearchStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string | undefined) => set({ isOpen: true, url }),
}));