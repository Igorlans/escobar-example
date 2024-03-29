import { create } from 'zustand'

export const useLoading = create((set) => ({
    loading: false,
    setLoading: (boolean) => set((state) => ({ loading: boolean })),
}))