import { FC } from "react";

import MeteorIcon from "@/components/icons/Meteor";
import GithubIcon from "@/components/icons/social/Github";
import LinkedInIcon from "@/components/icons/social/LinkedIn";
import FacebookIcon from "@/components/icons/social/Facebook";

import styles from "./index.module.css";

const Header: FC = () => {
  return (
    <header className="shadow-md">
      <nav className={`flex mx-auto items-center px-10 py-3 ${styles.header}`}>
        <MeteorIcon className="w-14 h-14" />

        <ul className="flex space-x-10 ml-10 text-lg text-gray-600">
          <li>
            <a  href="#">Blog</a>
          </li>

          <li>
            <a href="#">About me</a>
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
  );
};

export default Header;
