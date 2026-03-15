import { create } from "zustand";
import { UIState } from "./interfaces/ui.state.interface";

export const useUIStore = create<UIState>()((set) => ({
  isLoading: false,
  isSidebarOpen: false,
  activeModal: null,

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  openModal: (modalId: string) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),
}));

export const useIsLoading = () => useUIStore((state) => state.isLoading);
export const useIsSidebarOpen = () =>
  useUIStore((state) => state.isSidebarOpen);
export const useActiveModal = () => useUIStore((state) => state.activeModal);
