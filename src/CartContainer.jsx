import { useGlobalContext } from './AppContext';
import CartItem from './CartItem';

const CartContainer = () => {
  const { state, clearCart, total, totalAmount } = useGlobalContext();

  if (totalAmount === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {[...state.cartItems.values()].map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${total.toFixed(2)}</span>
          </h5>
        </div>
        <button
          className="btn btn-hipster"
          onClick={() => {
            clearCart();
          }}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
