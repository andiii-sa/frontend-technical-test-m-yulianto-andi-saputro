import { listUsers } from "@/constants";
import { User } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type GeneralState = {
  user: User ;
  isUser: boolean;
  isApprover: boolean;
  breadcrumb: string[];
  network: boolean
};

export type GeneralActions = {
  setUser: (user: User) => void;
  setBreadcrumb: (breadcrumb: string[]) => void;
  setNetwork: (value: boolean) => void;
};

export type GeneralStore = GeneralState & GeneralActions;

export const defaultInitState: GeneralState = {
  user: listUsers[1] as User,
  breadcrumb: ["Dashboard"],
  isApprover: (listUsers[1] as User).role === "APPROVER",
  isUser: (listUsers[1] as User).role === "USER",
  network: true
};

export const createGeneralStore = (
  initState: GeneralState = defaultInitState,
) => {
  return createStore<GeneralStore>()(
    persist(
      (set) => ({
        ...initState,

        setUser: (user: User) =>
          set({
            user,
            isApprover: user.role === "APPROVER",
            isUser: user.role === "USER",
          }),

        setBreadcrumb: (breadcrumb: string[]) => set({ breadcrumb }),
        setNetwork: (value: boolean) => set({ network: value }),
      }),
      {
        name: "general-store",

        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          user: state.user,
          breadcrumb: state.breadcrumb,
          network: state.network,
        }),
      },
    ),
  );
};
