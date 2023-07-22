import { create } from "zustand";

console.log(create);

export const useSitaStore = create(set => ({
  auth: true,
  setAuth: (auth: boolean) => set({ auth }),
  biconomySmartAccount: null,
  setBiconomySmartAccount: (biconomySmartAccount: any) => set({ biconomySmartAccount }),
}));
