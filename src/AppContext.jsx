import React, { createContext, useContext, useReducer } from 'react';
import cartItems from './data';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const INCREASE_AMOUNT = 'INCREASE_AMOUNT';
const DECREASE_AMOUNT = 'DECREASE_AMOUNT';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';
const CALCULATE_TOTAL = 'CALCULATE_TOTAL';
const FETCH_DATA = 'FETCH_DATA';

const defaultState = {
  cartItems: new Map(cartItems.map((cartItem) => [cartItem.id, cartItem])),
  total: cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price * currentValue.amount),
    0
  ),
};

const reducer = (state, action) => {
  switch (action.type) {
    case INCREASE_AMOUNT:
      //   const newItem = {
      //     ...state.cartItems.get(action.payload.id),
      //     amount: state.cartItems.get(action.payload.id).amount + 1,
      //   };

      const id = action.payload.id;
      const amount = state.cartItems.get(id).amount + 1;
      console.log(amount);
      const newItem = {
        ...state.cartItems.get(id),
        amount,
      };
      console.log(newItem);

      //   state.cartItems.set(id, newItem);

      //   state.cartItems.set(id, {
      //     ...state.cartItems.get(id),
      //     amount,
      //   });

      return { ...state };

    case DECREASE_AMOUNT:
      return;

    case REMOVE_ITEM:
      state.cartItems.delete(action.payload.id);
      return { ...state };

    case CLEAR_CART:
      state.cartItems.clear();
      return { ...state };

    case CALCULATE_TOTAL:
      let newTotal = 0;
      state.cartItems.forEach((value) => {
        newTotal += parseFloat(value.price * value.amount);
      });
      return { ...state, total: newTotal };

    case FETCH_DATA:
      return;
  }
  throw new Error(`No matching "${action.type}" action type`);
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { id } });
  };
  const decreaseAmount = () => {};
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const calculateTotal = () => {
    dispatch({ type: CALCULATE_TOTAL });
  };
  const fetchData = () => {};

  return (
    <GlobalContext.Provider
      value={{
        state,
        increaseAmount,
        decreaseAmount,
        removeItem,
        clearCart,
        calculateTotal,
        fetchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
