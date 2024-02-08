import { currencyFormatter } from "../Util/formatting";
import { useDispatch } from "react-redux";
import { AddItem } from "../Slice/HandelSlice";
import Button from "../UI/Button";
export default function MealItem({ meal }) {
  const dispatch = useDispatch();
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => dispatch(AddItem(meal))}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
