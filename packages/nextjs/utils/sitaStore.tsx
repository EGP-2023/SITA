import { create } from "zustand";

console.log(create)

export const useSitaStore = create((set) => ({

  biconomySmartAccount: null,
  setBiconomySmartAccount: (biconomySmartAccount: any) => set({ biconomySmartAccount }),
}));




