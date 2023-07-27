import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  CLEAR_CART,
  DECREASE_AMOUNT,
  DISPLAY,
  INCREASE_AMOUNT,
  IS_LOADING,
  REMOVE_ITEM,
} from './actions';
import reducer from './reducer';
import { calculateTotal } from './utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
  cartItems: new Map(),
  isLoading: false,
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { total, totalAmount } = calculateTotal(state.cartItems);

  const increaseAmount = (id) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { id } });
  };

  const decreaseAmount = (id) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { id } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const fetchData = async () => {
    try {
      dispatch({ type: IS_LOADING });
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: DISPLAY, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        increaseAmount,
        decreaseAmount,
        removeItem,
        clearCart,
        total,
        totalAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
