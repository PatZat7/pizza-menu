import { notFound } from "next/navigation";

import { getPizzaItem } from "@/lib/pizzaMenu";

export default async function ImagePage({ params }) {
  const pizzaItemSlug = params.slug;
  const pizzaItem = await getPizzaItem(pizzaItemSlug);

  if (!pizzaItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${pizzaItem.image}`} alt={pizzaItem.slug} />
    </div>
  );
}
