import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size?: string;
}

interface CartState {
  cart: {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    discountAmount: number;
    couponCode: string | null;
  };
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  calculateTotals: () => void;
}

const SHIPPING_THRESHOLD = 80; // Spedizione gratuita sopra gli 80€
const SHIPPING_COST = 7.90;
const TAX_RATE = 0.22; // IVA al 22%

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        discountAmount: 0,
        couponCode: null,
      },

      addItem: (item) => {
        const { cart } = get();
        const existingItem = cart.items.find((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
        );

        if (existingItem) {
          get().updateItemQuantity(existingItem.id, existingItem.quantity + item.quantity);
        } else {
          set((state) => ({
            cart: {
              ...state.cart,
              items: [...state.cart.items, item],
            },
          }));
          get().calculateTotals();
        }
      },

      removeItem: (id) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter((item) => item.id !== id),
          },
        }));
        get().calculateTotals();
      },

      updateItemQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          },
        }));
        get().calculateTotals();
      },

      clearCart: () => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: [],
            subtotal: 0,
            shipping: 0,
            tax: 0,
            total: 0,
            discountAmount: 0,
            couponCode: null,
          },
        }));
      },

      applyCoupon: (code, discount) => {
        set((state) => ({
          cart: {
            ...state.cart,
            couponCode: code,
            discountAmount: discount,
          },
        }));
        get().calculateTotals();
      },

      removeCoupon: () => {
        set((state) => ({
          cart: {
            ...state.cart,
            couponCode: null,
            discountAmount: 0,
          },
        }));
        get().calculateTotals();
      },

      calculateTotals: () => {
        const { cart } = get();

        // Calcola il subtotale sommando prezzo * quantità di ogni articolo
        const subtotal = cart.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        // Determina la spedizione (gratuita se il subtotale supera la soglia)
        const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

        // Applica lo sconto al subtotale
        const discountedSubtotal = subtotal - cart.discountAmount;

        // Calcola l'IVA sul subtotale scontato
        const tax = discountedSubtotal * TAX_RATE;

        // Calcola il totale
        const total = discountedSubtotal + shipping + tax;

        set((state) => ({
          cart: {
            ...state.cart,
            subtotal,
            shipping,
            tax,
            total,
          },
        }));
      },
    }),
    {
      name: 'pcl-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
