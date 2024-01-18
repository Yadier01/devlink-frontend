import {create} from "zustand";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  links: { url: string; platform: string }[];
  setUserInfo: (userInfo: Partial<{ firstName: string; lastName: string; email: string }>) => void;
  setUserLinks: (links: { url: string; platform: string }[]) => void;
};

export const useStore = create<State>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  links: [{ url: "", platform: "" }],
  setUserInfo: (userInfo) => set(state => ({ ...state, ...userInfo })),
  setUserLinks: (links) => set({ links }),
}));