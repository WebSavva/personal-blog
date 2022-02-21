import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout:FC = (props) => {
    return <div>
        <Header />

        <div className="mt-[90px] min-h-[90vh]">
            {props.children}
        </div>

        <Footer/>
    </div>
};

export default Layout;