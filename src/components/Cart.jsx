import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import { currencyFormatter } from "../Util/formatting.js";
import CartItem from "./CartItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { AddItem, RemoveItem } from "../Slice/HandelSlice.jsx";
import { hideCart, showCheckout } from "../Slice/HandelProgress.jsx";
export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.HandelApp);
  const { progress } = useSelector((store) => store.HandelProgress);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? () => dispatch(hideCart()) : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => dispatch(AddItem(item))}
            onDecrease={() => dispatch(RemoveItem(item.id))}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={() => dispatch(hideCart())}>
          Close
        </Button>

        {items.length > 0 ? (
          <Button onClick={() => dispatch(showCheckout())}>
            Go to Checkout
          </Button>
        ) : null}
      </p>
    </Modal>
  );
}
<button disabled={false}></button>;
