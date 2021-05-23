import React from "react";
import {Link} from'react-router-dom'
import {useDispatch} from'react-redux'
import {addProduct} from'./../../../Redux/Cart/cart.actions'
import "../products.scss"


const Product = (product)=>{
    const{
        documentID,
        productName,
        productPrice,
        productThumbnail,
        productDesc
    } = product;
    const dispatch = useDispatch();
  

    if(!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined' ||!productDesc  ) return null;

    const handleAddtoCart =(product)=>{
        if(!product) return;

        dispatch(
            addProduct(product)
            );
            // history.push('/cart')
    }
    return(
        <div className="wrapper">
        <div className="card" >
            <Link to={`/product/${documentID}`}>
            <img className="card_img"  src={productThumbnail}alt="productImage" />
            </Link>
            <div className="card__body">
            <Link to={`/product/${documentID}`}><h2> {productName}</h2></Link>
                <h4>₹{productPrice}</h4>
                <p className="card_desc" dangerouslySetInnerHTML={{__html:productDesc}}></p>
                <button  className="card__button"onClick ={()=> handleAddtoCart(product)}>
                    Add to Cart
                </button>
            </div>

        </div>
        </div>
    )

}
export default Product;