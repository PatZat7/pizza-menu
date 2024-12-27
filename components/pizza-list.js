import Link from "next/link";

export default function PizzaList({ menu }) {
  return (
    <ul className="news-list">
      {menu.map((pizzaItem) => (
        <li key={pizzaItem.id}>
          <Link href={`/menu/${pizzaItem.slug}`}>
            <img
              src={`/images/pizzas/${pizzaItem.image}`}
              alt={pizzaItem.title}
            />
            <span>{pizzaItem.slug}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
