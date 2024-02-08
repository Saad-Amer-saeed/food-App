import Modal from "../UI/Modal.jsx";
import { currencyFormatter } from "../Util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { hideCheckout } from "../Slice/HandelProgress.jsx";
import { useMutation } from "@tanstack/react-query";
import Error from "./Error.jsx";
import { SendMeal } from "../Util/http.js";
import { hideCart } from "../Slice/HandelProgress.jsx";
import { useQueryClient } from "@tanstack/react-query";
export default function Checkout() {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.HandelApp);

  const { progress } = useSelector((store) => store.HandelProgress);
  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: SendMeal,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    mutate({ items, customerData });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={() => dispatch(hideCheckout())}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isPending) {
    actions = <span>Sending order data...</span>;
  }

  if (isSuccess) {
    // queryClient.removeQueries("user");
    return (
      <Modal
        open={progress === "checkout"}
        onClose={() => dispatch(hideCart())}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={() => dispatch(hideCheckout())}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <>
      <Modal
        open={progress === "checkout"}
        onClose={() => dispatch(hideCheckout())}
      >
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

          <Input label="Full Name" type="text" id="name" />
          <Input label="E-Mail Address" type="email" id="email" />
          <Input label="Street" type="text" id="street" />
          <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />
          </div>
          <p className="modal-actions">{actions}</p>
        </form>
      </Modal>
    </>
  );
}
