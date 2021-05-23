import React from "react"
import "./header.scss"
import {useSelector,useDispatch } from 'react-redux'
import {signOutUserStart} from './../../Redux/User/user.actions'
import logo from"./../../Assets/amazon_PNG11.png"
import {Link} from "react-router-dom"
import { selectCartItemsCount} from './../../Redux/Cart/cart.selectors'


const mapState = (state) =>({
    currentUser:    state.user.currentUser,
    totalNumberofCartItem:selectCartItemsCount(state)
 });

const Header = props=>{
    const dispatch = useDispatch();
    const {currentUser,totalNumberofCartItem} = useSelector(mapState);

    const signOut =()=>{
        dispatch(signOutUserStart());
    };
    return(
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                    <img src ={logo} alt="Logo"/>
                    </Link>
                </div>
                <nav>
                    <ul>
                       
                        <li>
                            <Link to="/search"> Search</Link>
                        </li>
                    </ul>
                </nav>
            
            <div className="calltoActions">
                <ul>
                {currentUser &&[
                    <li><Link to="/cart">Your Cart({totalNumberofCartItem})</Link> </li>,
                    
                    <li><Link to="/dashboard">My Account</Link></li>,

                    <li ><span onClick={()=>signOut()}>Logout</span></li>
                   

                ]}
                 {!currentUser &&[
                     <li><Link to="/registration">Register</Link></li>,
                     <li><Link to="/login">Login</Link></li>
                    
                 ]}
                </ul>
               
            </div>
            </div>
        </header>
    );
};
Header.defaultProps ={
    currentUser:null
};



export default Header;


