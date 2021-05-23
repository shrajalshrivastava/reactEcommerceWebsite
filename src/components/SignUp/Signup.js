import React,{useState,useEffect } from "react"
import "./signup.scss"
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signUpUserStart} from './../../Redux/User/user.actions'
import FormInput from "./../forms/FormInput/form"
import Button from"./../forms/Button/button"



const mapState =({
    user
}) => ({
    currentUser: user.currentUser,
    userErr : user.userErr

});


const  SignUp = props => {


    const { currentUser,userErr} = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] =  useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] =  useState('');
    const [errors, setErrors] = useState([]);
   
    const resetForm = ()=>{
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
        } 

    useEffect(()=>{
        if(currentUser){
           resetForm();
           history.push('/');
        }
    }, [currentUser,history]);

    useEffect(()=>{

        if(Array.isArray(userErr) && userErr>0){
         setErrors(userErr);
        }

    },[userErr]);


   
    

const  handleFormSubmit = e =>{
        e.preventDefault(); 
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    
          
    }
        
    
        return(
            <div className="signup">
                <div className="wrap">
                    <h2>Signup</h2>

                    {errors.length>0 && (
                        <ul>
                            {errors.map((err,index) =>{
                              return(
                                <li key={index}>
                                    {err} 
                                </li>
)
                            })}
                        </ul>

                    )}

                    <div className="formWrap">
                    <form onSubmit={handleFormSubmit}>
                    <FormInput type="text" 
                    name="displayName" 
                    value={displayName}
                     placeholder="Full Name"
                     handleChange = {e=>setDisplayName(e.target.value)}/> 

                     <FormInput type="email" 
                    name="email" 
                    value={email}
                     placeholder="Email"
                     handleChange ={e => setEmail(e.target.value)}/> 

                     <FormInput type="password" 
                    name="password" 
                    value={password}
                     placeholder="Password"
                     handleChange ={e => setPassword(e.target.value)}/> 
                      

                     <FormInput type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    placeholder=" Confirm Password"
                    handleChange={e => setConfirmPassword(e.target.value)}/>
                     <Button type="submit">
                         Signup
                     </Button>
                     </form>
                     </div>
                </div>

            </div>
        );

    
}

export default SignUp;

