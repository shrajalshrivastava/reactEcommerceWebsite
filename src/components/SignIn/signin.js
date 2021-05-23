import React,{useState,useEffect} from "react"
import"./signin.scss"
import Button from "./../../components/forms/Button/button" 
import  FormInput from"./../../components/forms/FormInput/form";
import {Link, useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {emailSignInStart,googleSigninStart} from './../../Redux/User/user.actions'
 
const mapState = ({
 user    
}) =>({
    currentUser  : user.currentUser
})



const SignIn = props => {

    const {currentUser} = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() =>{
        if(currentUser){
         resetForm();
        history.push('/')

        }
    }, [currentUser, history]);


  const resetForm = ()=>{
      setEmail('');
      setPassword('');
  } 
    
  const handleSubmit = e =>{
        e.preventDefault(); // by doing this when user click the button it will stop the page to reload
        dispatch(emailSignInStart({email,password}));
    }
    const hadnleGoogleSignIn =() =>{
        dispatch(googleSigninStart());
    }
     return(
            <div className="signin">
                <div className="wrap">
                    <h2>Login</h2>
                    <div className="formWrap">
                       <form onSubmit={handleSubmit}>

                           <FormInput type="email"
                            name="email" 
                            value={email} 
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}/>

                    <FormInput type="password" 
                    name="password" 
                    value={password}
                     placeholder="Password"
                     handleChange={e => setPassword(e.target.value)}/> 


                            <Button type="submit">LOGIN</Button>

                           <div className="socialSignin">
                               <div className="row">
                                   <Button onClick={hadnleGoogleSignIn}>Sign in with Google</Button>
                               </div>
                               <Link to="/forgetpassword">
              Reset Password
            </Link>
                           </div>
                        </form> 
                    </div>
                </div>
        
            </div>
            );   
        
    
};
 
export default SignIn;
