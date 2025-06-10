import { toast } from "react-toastify";
import { create } from "zustand";

const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const useCart = create((set, get) => ({
  productInCart: getCartFromLocalStorage(),

  decrementQty: (id) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.id == id);
      if (index === -1) return {};

      if (copy[index].qty > 1) {
        copy[index].qty--;
      } else {
        copy.splice(index, 1);
      }

      saveCartToLocalStorage(copy);
      return { productInCart: copy };
    }),

  incrementQty: (id) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.id === id);

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
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );
    
       
        const totalQty = (existingItem?.qty || 0) + (product.qty || 1);
    
        if (totalQty > product.stock) {
          toast.warning(`Only ${product.stock} items in stock`);
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
     

  deleteItem: (id) =>
    set((state) => {
      let copy = [...state.productInCart];
      let index = copy.findIndex((el) => el.id == id);
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
