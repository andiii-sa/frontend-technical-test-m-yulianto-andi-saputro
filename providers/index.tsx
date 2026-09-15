'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'
import { useStore } from 'zustand'

import { type GeneralStore, createGeneralStore } from '@/stores'

export type GeneralStoreApi = ReturnType<typeof createGeneralStore>

export const GeneralStoreContext = createContext<GeneralStoreApi | undefined>(undefined)

export interface GeneralStoreProviderProps {
  children: ReactNode
}

export const GeneralStoreProvider = ({ children }: GeneralStoreProviderProps) => {
  const [store] = useState(() => createGeneralStore())
  return <GeneralStoreContext.Provider value={store}>{children}</GeneralStoreContext.Provider>
}

export const useGeneralStore = <T,>(selector: (store: GeneralStore) => T): T => {
  const generalStoreContext = useContext(GeneralStoreContext)
  if (!generalStoreContext) {
    throw new Error(`useGeneralStore must be used within GeneralStoreProvider`)
  }

  return useStore(generalStoreContext, selector)
}