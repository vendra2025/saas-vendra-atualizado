'use client'

import { create } from 'zustand'

export interface Addon {
  id: string
  category: 'files' | 'tokens' | 'whatsapp' | 'webchat'
  amount: string
  price: number
}

export interface CheckoutData {
  // Step 1 - Selection
  selectedAddons: Addon[]

  // Step 2 - Registration
  name: string
  email: string
  phone: string
  document: string
  company: string
  password: string

  // Step 3 - Payment
  paymentMethod: 'card' | 'pix' | null
}

interface CheckoutStore {
  currentStep: number
  data: CheckoutData
  setCurrentStep: (step: number) => void
  updateData: (data: Partial<CheckoutData>) => void
  addAddon: (addon: Addon) => void
  removeAddon: (addonId: string) => void
  getTotalPrice: () => number
  reset: () => void
}

const BASE_PLAN_PRICE = 97

const initialData: CheckoutData = {
  selectedAddons: [],
  name: '',
  email: '',
  phone: '',
  document: '',
  company: '',
  password: '',
  paymentMethod: null,
}

export const useCheckout = create<CheckoutStore>((set, get) => ({
  currentStep: 1,
  data: initialData,

  setCurrentStep: (step) => set({ currentStep: step }),

  updateData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),

  addAddon: (addon) =>
    set((state) => ({
      data: {
        ...state.data,
        selectedAddons: [...state.data.selectedAddons, addon],
      },
    })),

  removeAddon: (addonId) =>
    set((state) => ({
      data: {
        ...state.data,
        selectedAddons: state.data.selectedAddons.filter(
          (addon) => addon.id !== addonId
        ),
      },
    })),

  getTotalPrice: () => {
    const { selectedAddons } = get().data
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
    return BASE_PLAN_PRICE + addonsTotal
  },

  reset: () => set({ currentStep: 1, data: initialData }),
}))
