export async function fetchMeals() {
  let url = "http://localhost:3000/meals";

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  console.log(response.ok);
  const Meals = await response.json();

  return Meals;
}

export async function SendMeal({ items, customerData }) {
  const response = await fetch(`http://localhost:3000/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      order: {
        items: items,
        customer: customerData,
      },
    }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
}
