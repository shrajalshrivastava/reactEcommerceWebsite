import React from"react"
import "./style.scss"
import MenImage from"./../../Assets/shopMens.jpg"
import WomenImage from"./../../Assets/shopWomens.jpg"


const Directory = props =>{
    return(
        <div  className ="directory">
            <div className="wrap">
            <div 
            className ="item"
            style={{
                backgroundImage:`url(${WomenImage})`
            }}>
                <a href="/">Shop Womens</a>
            </div>
                <div 
              className ="item"
              style={{
                backgroundImage:`url(${MenImage})`
            }}>
                <a href="/">Shop Mens</a>
                </div>
        </div>

        </div>

    );

}
export default Directory;