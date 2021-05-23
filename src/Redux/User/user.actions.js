import userTypes from'./user.types' 


  
export const emailSignInStart = userCredentials =>({
    type : userTypes.EMAIL_SIGNIN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type : userTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const checkUserSession =() =>({
    type : userTypes.CHECK_USER_SESSION

}); 

export const signOutUserStart =()=>({
    type: userTypes.SIGN_OUT_USER_START
    

});


export const signOutUserSuccess =()=>({
    type: userTypes.SIGN_OUT_USER_SUCCESS

});

export const signUpUserStart = userCredentials =>({
    type: userTypes.SIGNUP_USER_START,
    payload: userCredentials

});

export const signUpUserSuccess =() =>({
    type:userTypes.SIGNUP_USER_SUCCESS
    });


export const userError = err =>({
    type: userTypes.USER_ERROR,
    payload: err
});

export const resetPasswordStart = userCredentials=>({
    type: userTypes.RESET_PASSWORD_START,
    payload: userCredentials
});
export const resetPasswordSuccess=()=>({
 type:userTypes.RESET_PASSWORD_SUCCESS,
 payload: true
});

export const resetUserState = ( )=>({
    type:userTypes.RESET_USER_STATE
});

export const googleSigninStart = () => ({
    type: userTypes.GOOGLE_SIGNIN_START
  });
  

































