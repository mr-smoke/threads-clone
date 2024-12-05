import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useMessageStore;
