import { notFound } from "next/navigation";

import ModalBackdrop from "@/components/modal-backdrop";
import { getPizzaItem } from "@/lib/pizzaMenu";

export default async function InterceptedImagePage({ params }) {
  const pizzaItemSlug = params.slug;
  const pizzaItem = await getPizzaItem(pizzaItemSlug);

  if (!pizzaItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/pizzas/${pizzaItem.image}`} alt={pizzaItem.slug} />
        </div>
      </dialog>
    </>
  );
}
