import { useState } from "react";

import Navigation from "./Navigation";
import ArticleSpy from "@/components/mdx/ArticleSpy";

const Header = () => {
  const [isSlidedIn, setIsSlidedIn] = useState(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        isSlidedIn ? "-translate-y-[90px]" : "translate-y-0"
      }`}
    >
      <Navigation onSlideIn={setIsSlidedIn} />

      <ArticleSpy />
    </header>
  );
};

export default Header;
