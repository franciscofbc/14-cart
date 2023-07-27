import React, { createContext, useContext, useEffect, useReducer } from 'react';
import cartItems from './data';
import {
  CALCULATE_TOTAL,
  CLEAR_CART,
  DECREASE_AMOUNT,
  FETCH_DATA,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
} from './actions';
import reducer from './reducer';
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const defaultState = {
  // cartItems: new Map(),
  // total: 0,
  // totalAmount: 0,
  cartItems: new Map(cartItems.map((cartItem) => [cartItem.id, cartItem])),
  total: cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price * currentValue.amount),
    0
  ),
  totalAmount: cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  ),
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  console.log(state.cartItems);

  // useEffect(() => {
  //   fetchData(url);
  // }, []);

  const increaseAmount = (cartItem) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { cartItem } });
  };

  const decreaseAmount = (cartItem) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { cartItem } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const calculateTotal = () => {
    dispatch({ type: CALCULATE_TOTAL });
  };

  const fetchData = (url) => {
    dispatch({ type: FETCH_DATA, payload: { url } });
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        increaseAmount,
        decreaseAmount,
        removeItem,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
