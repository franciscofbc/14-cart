import {
  CALCULATE_TOTAL,
  CLEAR_CART,
  DECREASE_AMOUNT,
  FETCH_DATA,
  INCREASE_AMOUNT,
  REMOVE_ITEM,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREASE_AMOUNT:
      const cartItemIncrease = action.payload.cartItem;
      state.cartItems.set(cartItemIncrease.id, {
        ...cartItemIncrease,
        amount: cartItemIncrease.amount + 1,
      });
      return { ...state };

    case DECREASE_AMOUNT:
      const cartItemDecrease = action.payload.cartItem;
      state.cartItems.set(cartItemDecrease.id, {
        ...cartItemDecrease,
        amount: cartItemDecrease.amount - 1,
      });
      return { ...state };

    case REMOVE_ITEM:
      state.cartItems.delete(action.payload.id);
      return { ...state };

    case CLEAR_CART:
      state.cartItems.clear();
      return { ...state };

    case CALCULATE_TOTAL:
      let newTotal = 0;
      let newTotalAmount = 0;

      state.cartItems.forEach((value) => {
        newTotal += parseFloat(value.price * value.amount);
        newTotalAmount += value.amount;
      });

      return {
        ...state,
        total: newTotal.toFixed(2),
        totalAmount: newTotalAmount,
      };

    case FETCH_DATA:
      const fetchData = async () => {
        try {
          const res = await fetch(action.payload.url);
          const data = await res.json();

          state.cartItems = new Map(data.map((item) => [item.id, item]));
          state.total = data.reduce(
            (accumulator, currentValue) =>
              accumulator +
              parseFloat(currentValue.price * currentValue.amount),
            0
          );
          state.totalAmount = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
          );

          console.log(state);
          return { ...state };
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
      console.log(state);
      return { ...state };
  }

  throw new Error(`No matching "${action.type}" action type`);
};

export default reducer;
