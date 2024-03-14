import { create } from "zustand";
type State = {
  firstName: string;
  lastName: string;
  email: string;
  links: { url: string; platform: string }[];
  image: string;
  setUserInfo: (
    userInfo: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      image: string;
    }>,
  ) => void;
  setUserLinks: (links: { url: string; platform: string }[]) => void;
};

export const useStore = create<State>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  links: [{ url: "", platform: "" }],

  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
  setUserLinks: (links) => set({ links }),
}));

