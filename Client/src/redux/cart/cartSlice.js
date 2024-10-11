import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  try {
    return savedCart && typeof savedCart === "string"
      ? JSON.parse(savedCart)
      : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
  },
  reducers: {
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.cartItems);
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.cartItems);
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload
        );
        saveCartToLocalStorage(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToLocalStorage(state.cartItems);
    },

    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.productId === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({
          productId: action.payload._id,
          name: action.payload.name,
          price: action.payload.price,
          photo: action.payload.photo,
          quantity: 1,
        });
      }
      // Corrected this line to only save cartItems
      saveCartToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  addToCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
