import React from "react"
import Headers from"./../components/Header/index"
import Footer from"./../components/Footer/footer";

const HomepageLayout = props =>{
    return(
        <div className="fullHeight">
            <Headers {...props}/>
            {props.children}
            <Footer/>
            
        </div>
    );
};

export default HomepageLayout;