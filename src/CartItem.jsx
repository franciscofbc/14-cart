import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useGlobalContext } from './AppContext';

const CartItem = ({ cartItem }) => {
  const { id, img, title, price, amount } = cartItem;
  const { increaseAmount, decreaseAmount, removeItem, calculateTotal } =
    useGlobalContext();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h5>{title}</h5>
        <span className="item-price">${price}</span>
        {/* remove button */}
        <button
          className="remove-btn"
          onClick={() => {
            removeItem(id);
            calculateTotal();
          }}
        >
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => {
            increaseAmount(cartItem);
            calculateTotal();
          }}
        >
          <FaChevronUp className="amount-icon" />
        </button>
        {/* amount */}
        <span className="amount">{amount}</span>
        {/* decrease amount */}
        <button
          className="amount-btn"
          onClick={() => {
            decreaseAmount(cartItem);
            amount === 1 && removeItem(id);
            calculateTotal();
          }}
        >
          <FaChevronDown className="amount-icon" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
