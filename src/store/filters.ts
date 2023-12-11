import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SmartPhoneState {
  processor: string[];
  memory: number[];
  storage: number[];
  battery: number[];
  searchQuery: string;
  page: number;
  setProcessor: (value: string, type: "add" | "remove" | "clear") => void;
  setMemory: (value: number, type: "add" | "remove" | "clear") => void;
  setStorage: (value: number, type: "add" | "remove" | "clear") => void;
  setBattery: (value: number, type: "add" | "remove" | "clear") => void;
  reset: () => void;
  setQuery: (value: string) => void;
  setPage: (value: number) => void;
}

export const useSmartPhoneState = create<SmartPhoneState>(
  // @ts-expect-error
  devtools(
    (set) => ({
      processor: [],
      memory: [],
      storage: [],
      battery: [],
      searchQuery: "",
      page: 1,
      setQuery(value) {
        set({ searchQuery: value, page: 1 });
      },
      setPage: (page) => set({ page }),
      setProcessor: (value, type) => {
        set((state) => {
          if (type === "add") {
            return {
              ...state,
              processor: [...state.processor, value],
            };
          } else if (type === "clear") {
            return {
              ...state,
              processor: [],
            };
          }
          return {
            ...state,
            processor: state.processor.filter((item) => item !== value),
          };
        });
      },
      setBattery(value, type) {
        set((state) => {
          if (type === "add") {
            return {
              ...state,
              battery: [...state.battery, value],
            };
          } else if (type === "clear") {
            return {
              ...state,
              battery: [],
            };
          }
          return {
            ...state,
            battery: state.battery.filter((item) => item !== value),
          };
        });
      },
      setMemory(value, type) {
        set((state) => {
          if (type === "add") {
            return {
              ...state,
              memory: [...state.memory, value],
            };
          }
          return {
            ...state,
            memory: state.memory.filter((item) => item !== value),
          };
        });
      },
      setStorage(value, type) {
        set((state) => {
          if (type === "add") {
            return {
              ...state,
              storage: [...state.storage, value],
            };
          } else if (type === "clear") {
            return {
              ...state,
              storage: [],
            };
          }
          return {
            ...state,
            storage: state.storage.filter((item) => item !== value),
          };
        });
      },
      reset() {
        set({
          battery: [],
          processor: [],
          memory: [],
          storage: [],
        });
      },
    }),
    { store: "filters" }
  )
);
