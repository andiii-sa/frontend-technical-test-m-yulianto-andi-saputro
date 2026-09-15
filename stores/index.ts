import { listUsers } from "@/constants";
import { User } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type GeneralState = {
  user: User ;
  isUser: boolean;
  isApprover: boolean;
  breadcrumb: string[];
};

export type GeneralActions = {
  setUser: (user: User) => void;
  setBreadcrumb: (breadcrumb: string[]) => void;
};

export type GeneralStore = GeneralState & GeneralActions;

export const defaultInitState: GeneralState = {
  user: listUsers[1] as User,
  breadcrumb: ["Dashboard"],
  isApprover: (listUsers[1] as User).role === "APPROVER",
  isUser: (listUsers[1] as User).role === "USER",
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
      }),
      {
        name: "general-store",

        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          user: state.user,
          breadcrumb: state.breadcrumb,
        }),
      },
    ),
  );
};
