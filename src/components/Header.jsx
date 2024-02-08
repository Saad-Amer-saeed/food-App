import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import { showCart } from "../Slice/HandelProgress";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.HandelApp);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>MenuFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={() => dispatch(showCart())}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
