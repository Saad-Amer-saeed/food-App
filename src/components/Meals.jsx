import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../Util/http";
import MealItem from "./MealItem";
import Error from "./Error";
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchMeals,
    staleTime: 5000,
  });

  if (isLoading) return <p>...Loading</p>;
  if (error)
    return <Error title="Faild to fetch meals" message={error.message}></Error>;
  return (
    <ul id="meals">
      {loadedMeals?.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
