import {
  CLEAR_CART,
  DECREASE_AMOUNT,
  DISPLAY,
  INCREASE_AMOUNT,
  IS_LOADING,
  REMOVE_ITEM,
} from './actions';

const reducer = (state, action) => {
  if (action.type === INCREASE_AMOUNT) {
    const newCartItems = new Map(state.cartItems);
    const cartItem = newCartItems.get(action.payload.id);
    const newCartItem = { ...cartItem, amount: cartItem.amount + 1 };
    newCartItems.set(action.payload.id, newCartItem);

    return { ...state, cartItems: newCartItems };
  }

  if (action.type === DECREASE_AMOUNT) {
    const newCartItems = new Map(state.cartItems);
    const cartItem = newCartItems.get(action.payload.id);

    if (cartItem.amount === 1) {
      newCartItems.delete(action.payload.id);
      return { ...state, cartItems: newCartItems };
    }

    const newCartItem = { ...cartItem, amount: cartItem.amount - 1 };
    newCartItems.set(action.payload.id, newCartItem);

    return { ...state, cartItems: newCartItems };
  }

  if (action.type === REMOVE_ITEM) {
    const newCartItems = new Map(state.cartItems);
    newCartItems.delete(action.payload.id);

    return { ...state, cartItems: newCartItems };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cartItems: new Map() };
  }

  if (action.type === IS_LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === DISPLAY) {
    const newCartItems = new Map(
      action.payload.data.map((item) => [item.id, item])
    );

    return { ...state, isLoading: false, cartItems: newCartItems };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
