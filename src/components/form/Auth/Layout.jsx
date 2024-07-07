import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description}) => {
    return (
        <>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        <main>
            <ToastContainer />
        {children}
        </main>
        </>   
    );
};

Layout.defaultProps = {
    title: "Ecommerce App",
    description: "Mern Stack project",
};

export default Layout;
