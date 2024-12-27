import express from "express";
import sqlite from "better-sqlite3";
import cors from "cors";

const PIZZA_LIST = [
  {
    id: "n1",
    slug: "Margherita",
    image: "margherita-pizza.jpg",
    description:
      "Classic pizza topped with fresh mozzarella, tomatoes, and basil leaves.",
    price: 8.99,
    sizeOptions: ["Small", "Medium", "Large"],
    toppings: ["Mozzarella", "Tomatoes", "Basil"],
    vegetarian: true,
  },
  {
    id: "n2",
    slug: "Pepperoni",
    image: "pepperoni-pizza.jpg",
    description: "A fan-favorite pizza with pepperoni and mozzarella cheese.",
    price: 10.99,
    sizeOptions: ["Small", "Medium", "Large"],
    toppings: ["Pepperoni", "Mozzarella"],
    vegetarian: false,
  },
  {
    id: "n3",
    slug: "bbq",
    image: "bbqChicken-pizza.jpg",
    description:
      "Tangy BBQ sauce topped with grilled chicken, red onions, and cilantro.",
    price: 12.49,
    sizeOptions: ["Small", "Medium", "Large"],
    toppings: ["BBQ Sauce", "Grilled Chicken", "Red Onions", "Cilantro"],
    vegetarian: false,
  },
  {
    id: "n4",
    slug: "veggie-supreme",
    image: "vegetarian-pizza.jpg",
    description:
      "A colorful medley of bell peppers, olives, onions, and mushrooms.",
    price: 11.49,
    sizeOptions: ["Small", "Medium", "Large"],
    toppings: ["Bell Peppers", "Olives", "Onions", "Mushrooms"],
    vegetarian: true,
  },
  {
    id: "n5",
    slug: "meat-lovers",
    image: "meatLovers-pizza.jpg",
    description:
      "Loaded with pepperoni, sausage, ham, and bacon for the ultimate carnivore.",
    price: 13.99,
    sizeOptions: ["Small", "Medium", "Large"],
    toppings: ["Pepperoni", "Sausage", "Ham", "Bacon"],
    vegetarian: false,
  },
];

const db = sqlite("data.db");

function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS pizzas (
    id INTEGER PRIMARY KEY,
    slug TEXT UNIQUE,
    image TEXT,
    description TEXT,
    price INTEGER,
    vegetarian INTEGER,
    sizeOptions TEXT,
    toppings TEXT
  )`
  ).run();

  const { count } = db.prepare("SELECT COUNT(*) as count FROM pizzas").get();

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO pizzas (slug, image, description, price, vegetarian, sizeOptions, toppings) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    PIZZA_LIST.forEach((pizza) => {
      insert.run(
        pizza.slug,
        pizza.image,
        pizza.description,
        pizza.price,
        pizza.vegetarian ? 1 : 0,
        JSON.stringify(pizza.sizeOptions),
        JSON.stringify(pizza.toppings)
      );
    });
  }
}

const app = express();

app.use(cors());

// app.get('/news', (req, res) => {
//   const news = db.prepare('SELECT * FROM news').all();
//   res.json(news);
// });

app.get("/api/pizzas", (req, res) => {
  const pizzas = db.prepare("SELECT * FROM pizzas").all();
  res.json(
    pizzas.map((pizza) => ({
      ...pizza,
      vegetarian: pizza.vegetarian === 1,
      sizeOptions: JSON.parse(pizza.sizeOptions),
      toppings: JSON.parse(pizza.toppings),
    }))
  );
});
console.log(`calling initDb()`);

initDb();

app.listen(8080);
