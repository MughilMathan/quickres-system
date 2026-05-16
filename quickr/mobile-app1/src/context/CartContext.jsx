import React, { createContext, useContext, useReducer, useEffect } from 'react';
import socket from '../services/socket';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item, variant } = action.payload;
      const cartKey = item._id + (variant ? `-${variant.label}` : '');
      const existingItemIndex = state.items.findIndex(i => i.cartKey === cartKey);

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].qty += 1;
        return { ...state, items: newItems };
      }

      const newItem = {
        ...item,
        cartKey,
        variant,
        qty: 1,
        unitPrice: variant ? variant.price : item.price,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case 'UPDATE_QTY': {
      const { cartKey, qty } = action.payload;
      if (qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== cartKey) };
      }
      return {
        ...state,
        items: state.items.map(i => i.cartKey === cartKey ? { ...i, qty } : i),
      };
    }

    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter(i => i.cartKey !== action.payload) };
    }

    case 'TOGGLE_TAKEAWAY': {
      return { ...state, takeaway: !state.takeaway };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [], takeaway: false };
    }

    case 'HANDLE_REMOVED_MENU_ITEM': {
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    takeaway: false,
  });

  useEffect(() => {
    socket.on('menu_item_deleted', ({ id }) => {
      dispatch({ type: 'HANDLE_REMOVED_MENU_ITEM', payload: id });
    });
    return () => socket.off('menu_item_deleted');
  }, []);

  const addToCart = (item, variant = null) => dispatch({ type: 'ADD_TO_CART', payload: { item, variant } });
  const updateQty = (cartKey, qty) => dispatch({ type: 'UPDATE_QTY', payload: { cartKey, qty } });
  const removeItem = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });
  const toggleTakeaway = () => dispatch({ type: 'TOGGLE_TAKEAWAY' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const subtotal = state.items.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const parcelCharge = state.takeaway ? state.items.length * 5 : 0;
  const total = subtotal + parcelCharge;

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addToCart, 
      updateQty, 
      removeItem, 
      toggleTakeaway, 
      clearCart,
      subtotal,
      parcelCharge,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};