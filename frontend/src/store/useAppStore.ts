import { create } from 'zustand';

interface AppState {
    user: string;
    setUser: (user: string) => void;
}

const useAppStore = create<AppState>((set: (partial: Partial<AppState>) => void) => ({
    user: 'Jane Doe',
    setUser: (user: string) => set({ user }),
}));

export default useAppStore;