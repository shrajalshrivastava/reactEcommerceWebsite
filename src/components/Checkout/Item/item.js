import React from 'react'
import {useDispatch} from "react-redux"
import {removeCartItem,addProduct,reduceCartItem} from "./../.././../Redux/Cart/cart.actions"
const Item = (product )=>{

   const dispatch = useDispatch( );
    const {
    productName,
     productThumbnail,
     productPrice,
     quantity,
     documentID}  = product;

     const handleRemoveCartItem =(documentID)=>{
        dispatch(
        removeCartItem(
            {documentID}
            )
        );

     }
     const handleAddProduct = (product)=>{
         dispatch(
             addProduct(product)
         );
     }
     const handleReduceCartItem = (documentID)=>{
         dispatch(reduceCartItem({documentID})
         );
     }


    return(
        <table className="cartItem" border="0" cellPadding="10" cellSpacing="0">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt="productImage"/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span  className="cartBtn cartidbtn" onClick ={()=> handleReduceCartItem(documentID)}>
                           {`-`} 
                        </span>
                        <span>
                        {quantity}
                        </span>
                        <span className="cartBtn cartidbtn" onClick={()=>handleAddProduct(product)}>
                            {`+`}
                        </span>
                    </td>
                    <td>
                        ₹{productPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={()=> handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                   
                </tr>
            </tbody>
        </table>
    )
}

export default Item;