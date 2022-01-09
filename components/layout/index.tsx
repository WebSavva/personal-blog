import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout:FC = (props) => {
    return <div>
        <Header />

        {props.children}

        <Footer/>
    </div>
};

export default Layout;