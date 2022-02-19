import { useEffect , useRef, useState } from "react";
import Link from "next/link";
import debounce from 'lodash/debounce';

import MeteorIcon from "@/components/icons/Meteor";
import GithubIcon from "@/components/icons/social/Github";
import LinkedInIcon from "@/components/icons/social/LinkedIn";
import FacebookIcon from "@/components/icons/social/Facebook";

import ArticleSpy from "@/components/mdx/ArticleSpy";

const Header = () => {
  const prevScrolled = useRef<number>(0);
  const [isSlidedIn, setIsSlidedIn] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = debounce(() => {
      const updatedScrolled = window.pageYOffset;

      setIsSlidedIn(prevScrolled.current < updatedScrolled);
      
      prevScrolled.current = window.pageYOffset;
    },0 );

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className={`fixed top-0 z-10 w-full transition-all ${isSlidedIn ? 'translate-y-[-90px]' : 'translate-y-0'}`}>
      <header className="shadow-md  bg-white">
        <nav className={`flex mx-auto items-center px-10 py-3 w-[1000px] h-[90px]`}>
          <MeteorIcon className="w-14 h-14" />

          <ul className="flex space-x-10 ml-10 text-lg text-gray-600">
            <li>
              <Link href="/">
                <a>Intro</a>
              </Link>
            </li>

            <li>
              <Link
                href={{
                  pathname: "/blog/page/[pageNumber]",
                  query: {
                    pageNumber: 1,
                  },
                }}
              >
                <a>Blog</a>
              </Link>
            </li>
          </ul>

          <div className="flex ml-auto items-center space-x-4 text-gray-800">
            <a href="#">
              <LinkedInIcon className="w-6 h-6" />
            </a>

            <a href="#">
              <GithubIcon className="w-6 h-6" />
            </a>

            <a href="#">
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </header>

      <ArticleSpy />
    </div>
  );
};

export default Header;
