// stores/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  user: {
    email: null,
    password: null,
    pannum: null,
    phnnumber:null
  },
  taxpayerData: [],  // This will hold the fetched taxpayer data
  setUser: (email, password, pannum,phnnumber) => {
    const userData = { email, password, pannum,phnnumber };
    set(() => ({ user: userData }));
  },
  setTaxpayerData: (data) => {
    set(() => ({ taxpayerData: data }));  // Action to update taxpayerData
  },
  clearUser: () => {
    set(() => ({
      user: { email: null, password: null, pannum: null,phnnumber:null },
      taxpayerData: [], // Reset taxpayerData as well
    }));
  },
}));

export default useStore;
