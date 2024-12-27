import logo from "@/assets/pizza-logo.jpg";
import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A newspaper" />
      <h1>PIZZA PIZZA</h1>

      <p>
        <Link href="/menu">Checkout the menu</Link>
      </p>
    </div>
  );
}
