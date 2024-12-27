import Link from "next/link";

import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">Demo-Pizza-Menu</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/menu">Menu</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
