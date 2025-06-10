import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavorite = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (productId) => {
        const current = get().favorites;
        const updated = current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId];

        set({ favorites: updated });
      },

      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: "favorites", 
    }
  )
);
