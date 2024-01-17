import { create } from 'zustand';

interface Givers {
  name: string;
  amount: number;
}

interface Store {
  givers: Givers[];
  addGiver: (sessionDetail: Givers) => void;
}

export const useAppStore = create<Store>((set) => ({
  givers: [
    {
      name: 'Henok Getachew',
      amount: 100,
    },
    {
      name: 'Ruth Hailu',
      amount: 50,
    },
    {
      name: 'Dani Witman',
      amount: 20,
    },
  ],
  addGiver: (giver) => set((state) => ({ givers: [...state.givers, giver] })),
}));

export const getState = () => useAppStore.getState();
