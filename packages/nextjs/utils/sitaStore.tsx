import { create } from "zustand";

console.log(create)

export const useSitaStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  biconomySmartAccount: null,
  setBiconomySmartAccount: (biconomySmartAccount: any) => set({ biconomySmartAccount }),
}));




