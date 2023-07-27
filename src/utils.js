export const calculateTotal = (cartItems) => {
  let total = 0;
  let totalAmount = 0;
  cartItems.forEach(({ price, amount }) => {
    total += parseFloat(price * amount);
    totalAmount += amount;
  });
  return { total, totalAmount };
};
