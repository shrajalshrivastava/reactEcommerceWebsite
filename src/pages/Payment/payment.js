import React from 'react'
import PaymentDetails from '../../components/PaymentDetails/paymentDetails'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { publicKey } from '../../Stripe/config.js'


const stripePromise = loadStripe(publicKey);
const Payment = ()=>{
    return(
<div>
    <Elements stripe ={stripePromise}>
     <PaymentDetails/>
    </Elements>
   
    
</div>
    )
}
export default Payment;