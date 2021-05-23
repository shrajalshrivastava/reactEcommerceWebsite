import React,{useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {fetchProductStart,setProduct} from './../../Redux/Products/products.actions'
import {addProduct }from "./../../Redux/Cart/cart.actions"
import './productDetail.scss'
import {useHistory} from 'react-router-dom'

const mapState  = state =>({
    product : state.productsData.product

});
export default function Details() {
    const {productID} =useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {product} = useSelector(mapState);
    
    const {
        productName,
        productThumbnail,
        productPrice,
        productDesc

    } = product
    const imgDiv = useRef();

    useEffect(()=>{
        dispatch(fetchProductStart(productID))

        return () =>{
            dispatch(
                setProduct({})
            )
        }

    },[]);
    const handleAddToCart =(product)=>{
        if(!product) return
        dispatch(addProduct(product));
        history.push('/cart')
    }



    const handleMouseMove = e =>{
        const {left, top, width, height} = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        imgDiv.current.style.backgroundPosition = `${x}% ${y}%`
    }


    return (
    
               
                   <div className="details" key={product._id}>
                       <div className="img-container" onMouseMove={handleMouseMove}
                       style={{backgroundImage: `url(${productThumbnail})`}} ref={imgDiv} 
                       onMouseLeave={() => imgDiv.current.style.backgroundPosition = `center`} />

                       <div className="box-details">
                           <h2 >{productName}</h2>
                           <h3>₹{productPrice}</h3>
                           <p dangerouslySetInnerHTML={{__html:productDesc}}></p>
                           <button  className="cart" onClick={() => handleAddToCart(product)}> Add to cart</button>
                       </div>

                   </div>
              
          
    )
}
