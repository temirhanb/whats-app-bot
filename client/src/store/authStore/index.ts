import {create} from "zustand/react";

export type StateAuthUser = {
  number: string
}

type Actions = {
  setNumber: (number: string) => void
}

export const useAuthStore = create<Actions & StateAuthUser>((set) => ({
  number: "",
  setNumber: (number) => set(() => ({
    number: number
  })),
}));