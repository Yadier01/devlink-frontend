import { create } from "zustand";

interface Store {
  yourState: any;
  yourAction: (val: any) => void;
}
export const useStore = create<Store>((set) => ({
  yourState: "VALUE",
  yourAction: (val) => set((state) => ({ yourState: state.yourState })),
}));
