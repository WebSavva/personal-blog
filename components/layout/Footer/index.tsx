import { FC } from "react";

const Footer = () => {
    return <footer className="bg-gray-900 text-gray-200 text-center px-2 py-10">
        <p className="mb-5">
            Created by WebSavva
        </p>

        <p>
           &copy; All rights reserved {new Date().getFullYear()}
        </p>
    </footer>
};

export default Footer;