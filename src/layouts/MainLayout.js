import React from "react"
import Headers from"./../components/Header/index.js"
import Footer from"./../components/Footer/footer";


const MainLayout = props =>{
    return(
        <div>
            <Headers {...props}/>
            <div className="main">
                {props.children}
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;