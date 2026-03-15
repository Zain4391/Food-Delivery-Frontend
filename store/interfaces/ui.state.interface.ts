export interface UIState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  activeModal: string | null;

  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
}
