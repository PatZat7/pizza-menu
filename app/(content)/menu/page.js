import PizzaList from "@/components/pizza-list";
import { getAllPizzas } from "@/lib/pizzaMenu";

export default async function MenuPage() {
  const menu = await getAllPizzas();

  return (
    <>
      <h1>Menu</h1>
      <PizzaList menu={menu} />
    </>
  );
}
