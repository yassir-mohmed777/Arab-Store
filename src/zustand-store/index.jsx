import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const domain = "http://localhost:1337";

export const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token") || null,

  setToken: (newToken) => {
    sessionStorage.setItem("token", newToken);
    set({ token: newToken });
  },

  clearToken: () => {
    sessionStorage.removeItem("token");
    set({ token: null });
  },
}));

const FAVORITES_KEY = "favorites";

const getFavoritesFromStorage = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const useFavoriteStore = create((set) => ({
  favorites: getFavoritesFromStorage(),

  toggleFavorite: (productId) =>
    set((state) => {
      let updatedFavorites;
      if (state.favorites.includes(productId)) {
        updatedFavorites = state.favorites.filter((id) => id !== productId);
      } else {
        updatedFavorites = [...state.favorites, productId];
      }
      saveFavoritesToStorage(updatedFavorites);
      return { favorites: updatedFavorites };
    }),

  isFavorite: (productId) => {
    return getFavoritesFromStorage().includes(productId);
  },
}));

export const useData = create(
  persist(
    (set) => ({
      Categorice: [],

      setData: (categories) => set(() => ({ Categorice: categories })),
    }),
    {
      name: "categorice",
      getStorage: () => localStorage,
    }
  )
);

export const useLoader = create((set) => ({
  LoaderIndex: false,
  openLoader: () => set({ LoaderIndex: true }),
  closeLoader: () => set({ LoaderIndex: false }),
}));

export const useReview = create(
  persist(
    (set) => ({
      refreshReviews: false,
      ReviewsData: [],

      setReviews: (Reviews) => set(() => ({ ReviewsData: Reviews })),
      triggerRefresh: () => set({ refreshReviews: true }),
      clearRefresh: () => set({ refreshReviews: false }),
    }),
    {
      name: "reviews-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useModalSearh = create((set) => ({
  ModalSearh: false,

  openModalSearh: () => set(() => ({ ModalSearh: true })),
  closeModalSearh: () => set(() => ({ ModalSearh: false })),
}));

export const useModalReview = create((set) => ({
  modalRevIndex: false,

  openReview: () => set(() => ({ modalRevIndex: true })),
  closeReview: () => set(() => ({ modalRevIndex: false })),
}));

export const useFilterModal = create((set) => ({
  filterModalIndex: false,

  openModal: () => set(() => ({ filterModalIndex: true })),
  closeModal: () => set(() => ({ filterModalIndex: false })),
}));

export const useModalHed = create((set) => ({
  modalIndex: false,

  openModal: () => set(() => ({ modalIndex: true })),
  closeModal: () => set(() => ({ modalIndex: false })),
}));

export const useCats = create((set) => ({
  catName: null,

  setCatName: (catName) => set(() => ({ catName: catName })),
}));

export const useCategorice = create((set) => ({
  CatId: null,

  setcatId: (catId) => set(() => ({ CatId: catId })),
}));

const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useCart = create((set, get) => ({
  productInCart: getCartFromLocalStorage(),

  decrementQty: (documentId) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.documentId == documentId);
      if (index === -1) return {};

      if (copy[index].qty > 1) {
        copy[index].qty--;
      } else {
        copy.splice(index, 1);
      }

      saveCartToLocalStorage(copy);
      return { productInCart: copy };
    }),

  incrementQty: (documentId) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.documentId === documentId);

      copy[index].qty++;

      saveCartToLocalStorage(copy);
      return { productInCart: copy };
    }),

    addToCart: (product) => {
      let wasAdded = false;
    
      set((state) => {
        const cart = [...state.productInCart];
    
        const existingItem = cart.find(
          (item) =>
            item.documentId === product.documentId &&
            item.size === product.size &&
            item.color === product.color
        );
    
       
        const totalQty = (existingItem?.qty || 0) + (product.qty || 1);
    
        if (totalQty > product.product_stock) {
          toast.warning(`Only ${product.product_stock} items in stock`, {
            position: "top-center",
          });
          return {};
        }
    
        if (existingItem) {
          existingItem.qty += product.qty || 1;
        } else {
          cart.push({ ...product });
        }
    
        saveCartToLocalStorage(cart);
        wasAdded = true;
        return { productInCart: cart };
      });
    
      return wasAdded;
    },
    
    
    

  deleteItem: (documentId) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.documentId == documentId);
      copy.splice(index, 1);
      saveCartToLocalStorage(copy);
      return { productInCart: copy };
    }),

  resetCart: () =>
    set(() => {
      saveCartToLocalStorage([]);
      return { productInCart: [] };
    }),
}));
