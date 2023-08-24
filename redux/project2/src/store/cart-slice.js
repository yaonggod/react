import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const exist = state.items.find(item => item.id === newItem.id);
            if (!exist) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                exist.quantity++;
                exist.totalPrice += exist.price;
            }
        },
        removeItemFromCart(state, action) {
            const newItem = action.payload;
            const exist = state.items.find(item => item.id === newItem.id);
            if (exist.quantity === 1) {
                const index = state.items.indexOf(exist);
                state.items.splice(index, 1);
            } else {
                exist.quantity--;
                exist.totalPrice -= exist.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;