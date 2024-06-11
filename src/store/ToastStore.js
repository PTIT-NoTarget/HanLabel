import { create } from "zustand";

const useToastStore = create((set) => ({
  Toast : {
    show: false,
    content: "",
    type: "success",
  },
  setToast: (Toast) => set({ Toast: Toast }),
}));

export default useToastStore;  