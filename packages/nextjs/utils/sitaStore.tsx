import { create } from "zustand";

console.log(create);

export interface SitaStore {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  biconomySmartAccount: any;
  setBiconomySmartAccount: (biconomySmartAccount: any) => void;
}

export const useSitaStore = create<SitaStore>(set => ({
  auth: true,
  setAuth: (auth: boolean) => set({ auth }),
  biconomySmartAccount: null,
  setBiconomySmartAccount: (biconomySmartAccount: any) => set({ biconomySmartAccount }),
}));
