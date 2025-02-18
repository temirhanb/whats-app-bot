import {create} from "zustand/react";

export interface IParseString {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IUserData {
  number: string;
}

export type ArrayStateMessage = {
  messages: Array<string>
}

type Actions = {
  receiveNotificationMessage: (data: { text: string }) => void
  sendMessage: (data: { text: string }) => void
}

export const useMessageStore = create<Actions & ArrayStateMessage>((set) => ({
  messages: [],
  receiveNotificationMessage: (data) => set((state) => ({
    messages: [...state.messages, data.text]
  })),

  sendMessage: (data) =>
    set((state) => ({
      messages: [...state.messages, data.text]
    })),
}));