import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout:FC = (props) => {
    return <div>
        <Header />

        <div className="mt-[90px]">
            {props.children}
        </div>

        <Footer/>
    </div>
};

export default Layout;