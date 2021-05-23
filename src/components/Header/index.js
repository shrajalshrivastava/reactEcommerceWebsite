import React, {useState} from 'react';
import Menu from "../../Assets/svg/bars-solid.svg"
import Cart from "../../Assets/svg/cart.svg"
import Close from "../../Assets/svg/times-solid.svg"
import {Link } from 'react-router-dom' 
import {useSelector,useDispatch} from "react-redux"
import {signOutUserStart} from './../../Redux/User/user.actions'
import { selectCartItemsCount} from './../../Redux/Cart/cart.selectors'
import "./style.scss" 


const mapState = (state) =>({
    currentUser:    state.user.currentUser,
    totalNumberofCartItem:selectCartItemsCount(state)
 });


const Headers =()=>{
    const [menu,setMenu] =useState(false)
    const dispatch = useDispatch( );
    const {currentUser,totalNumberofCartItem} = useSelector(mapState);

    const toggleMenu = () =>{
        setMenu(!menu)
    }
    const signOut =()=>{
        dispatch(signOutUserStart());
    };
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return(
        <header>
           
            <div className="menu" onClick={toggleMenu}>
                <img src={Menu} alt="" width="30" />
            </div>
         
            <div className="logo">
                <Link to="/product">
              <img src="https://tse2.mm.bing.net/th?id=OIP.IX0DATxRx223zw6bUBVNSwHaCl&pid=Api&P=0&w=521&h=182" alt="BrandLogo"/>
              </Link>
            </div>
            
                
                
            <ul style={styleMenu}>
               {
                currentUser &&[  
                <li><Link to="/dashboard">My Account</Link></li>,
                <li ><span onClick={()=>signOut()}>Logout</span></li>,
                <li onClick={toggleMenu}>
                <img src={Close} alt="" width="30" className="menu" />
                </li>


                ]}
                   
                
                 {!currentUser &&[
                     <li><Link to="/registration">Register</Link></li>,
                     <li><Link to="/login">Login</Link></li>,
                     <li onClick={toggleMenu}>
                     <img src={Close} alt="" width="30" className="menu" />
                      </li>
                    
                 ]}
            </ul>
            <div className="cart-icon">
                <span>{totalNumberofCartItem}</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width="30" />
                </Link>
            </div>
        </header>
    )
};
Headers.defaultProps ={
    currentUser:null
};

export default Headers;