import { create } from 'zustand'

export const useAuth = create((set) => ({
    isAuth: false,
    userId: null,
    setAuth: (boolean) => set((state) => ({ isAuth: boolean })),
    setUserId: (userId) => set((state) => ({ userId: userId })),
}))