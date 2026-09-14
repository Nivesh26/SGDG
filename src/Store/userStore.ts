import { create } from "zustand";

interface User {
    name: string;
    email: string;
    age: number;
}

interface UserStore {
    user: User;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setAge: (age: number) => void;
    resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        name: "Nivesh",
        email: "nivesh@gmail.com",
        age: 23,
    },

    setName: (name) =>
        set((state) => ({
            user: {
                ...state.user,
                name: name,
            },
        })),

    setEmail: (email) =>
        set((state) => ({
            user: {
                ...state.user,
                email: email,
            },
        })),

    setAge: (age) =>
        set((state) => ({
            user: {
                ...state.user,
                age: age,
            },
        })),

    resetUser: () =>
        set({
            user: {
                name: "Nivesh",
                email: "nivesh@gmail.com",
                age: 23,
            },
        }),
}));
