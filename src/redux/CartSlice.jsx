import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of plant items: { id, name, image, price, category, quantity }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * addItem — Add a plant to the shopping cart.
     * Prevents duplicate entries: if the item already exists in the cart,
     * updates its quantity; otherwise adds the plant with quantity = 1.
     */
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === plant.id || item.name === plant.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          image: plant.image,
          price: Number(plant.price),
          category: plant.category,
          quantity: 1,
        });
      }
    },

    /**
     * removeItem — Completely removes a selected plant from the cart.
     * Supports passing either the plant id, name, or an object containing id/name.
     */
    removeItem: (state, action) => {
      const payload = action.payload;
      const targetId =
        typeof payload === 'object' && payload !== null
          ? (payload.id ?? payload.name)
          : payload;

      state.items = state.items.filter(
        (item) => item.id !== targetId && item.name !== targetId
      );
    },

    /**
     * updateQuantity — Increases or decreases the quantity of a selected plant.
     * Prevents quantities from becoming zero or negative through controls (minimum quantity: 1).
     */
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) =>
          (id !== undefined && item.id === id) ||
          (name !== undefined && item.name === name)
      );

      if (itemToUpdate && quantity > 0) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
