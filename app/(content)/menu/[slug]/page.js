import { notFound } from "next/navigation";
import Link from "next/link";

import { getPizzaItem } from "@/lib/pizzaMenu";

export default async function PizzaDetailPage({ params }) {
  const pizzaSlug = params.slug;
  const pizzaItem = await getPizzaItem(pizzaSlug);

  if (!pizzaItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/menu/${pizzaItem.slug}/image`}>
          <img
            src={`/images/pizzas/${pizzaItem.image}`}
            alt={pizzaItem.title}
          />
        </Link>
        <h1>{pizzaItem.slug}</h1>
      </header>
      <p>{pizzaItem.description}</p>
    </article>
  );
}
