import sql from "better-sqlite3";

const db = sql("data.db");

export async function getAllPizzas() {
  const menu = db.prepare("SELECT * FROM pizzas").all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return menu;
}

export async function getPizzaItem(slug) {
  const pizzaItem = db.prepare("SELECT * FROM pizzas WHERE slug = ?").get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return pizzaItem;
}
