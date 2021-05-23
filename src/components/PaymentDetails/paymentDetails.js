import React, {useState, useEffect} from 'react'
import './paymentDetails.scss'
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import FormInput from '../forms/FormInput/form'
import Button from '../forms/Button/button'
import {CountryDropdown} from'react-country-region-selector' 
import {apiInstance} from './../../Utils/index'
import {selectCartTotal,selectCartItemsCount,selectCartItems }from './../../Redux/Cart/cart.selectors'
import {createStructuredSelector } from"reselect"
import {useSelector, useDispatch}from 'react-redux'
import {saveOrderHistory} from './../../Redux/Orders/orders.actions'
import {clearCart} from "./../../Redux/Cart/cart.actions"
import { useHistory } from 'react-router'

const mapState = createStructuredSelector({
   total : selectCartTotal,
   itemCount: selectCartItemsCount,
   cartItems: selectCartItems
})
const IntialAddress ={
    line1:'',
    line2: '',
    city:'',
    state:'',
    postalCode: '',
    country: ''


}

const PaymentDetails = () =>{

    const elements= useElements();
    const stripe = useStripe();
    const history = useHistory()
    const dispatch = useDispatch( )
    const {total,itemCount,cartItems}  = useSelector(mapState)
    const [billingAddress,setBillingAddress] = useState({
        ...IntialAddress
    });
    const [shippingAddress,setShippingAddress] = useState ({
        ...IntialAddress
    });

    const [recipentName, setRecipentName] = useState('');
    const [nameOnCard,setnameOnCard] = useState('');

    useEffect(()=>{
        if(itemCount<1){
            history.push('/dashboard')
        }
    },[itemCount,history])

    const handleShipping = e =>{
        const {
            name,
            value
        } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]:value
        });
    };
    const handleBilling = e =>{
        const{ name, value}= e.target;
        setBillingAddress({
            ...billingAddress,
            [name]:value
        });
    };
    const configCardElement = {
        iconStyle:'solid',
        style:{
            base:{
               fontSize :'16px' 
            }
        },
        hidePostalCoode :true

    }
     const handleSubmit = async e =>{
         e.preventDefault();
         const CardElement = elements.getElement('card')

         if(!shippingAddress.line1 || !shippingAddress.city
           || !shippingAddress.state || !shippingAddress.postalCode
           || !shippingAddress.country
           ||! billingAddress.line1
           ||! billingAddress.city
           ||! billingAddress.state
           ||! billingAddress.country
           ||!recipentName || !nameOnCard) {
               return;
            }
            apiInstance.post('/payments/create',{
                amount: total*100,
                shipping:{
                    name :recipentName,
                    address:{
                        ...shippingAddress
                    }
                }
            }).then(({
                data:clientSecret
            })=>{
                    stripe.createPaymentMethod({
                        type:'card',
                        card:CardElement,
                        billing_details:{
                            name: nameOnCard,
                            address:{
                                ...billingAddress
                            }
                        }
                    }).then(({
                       paymentMethod 
                    })=>{
                        stripe.confirmCardPayment({
                            clientSecret,
                            payment_method: paymentMethod.id
                        }).then(({
                            paymentIntent
                        })=>{
                            const orderDetails = {
                                orderTotal:total,
                                orderItems: cartItems.map(item=>{
                                    const {documentID, productName, 
                                        productThumbnail, productPrice,quantity} = item;
                                    return{
                                        documentID,
                                        productName,
                                        productPrice,
                                        productThumbnail,
                                        quantity
                                    }
                                })
                            }
                            dispatch(saveOrderHistory(orderDetails));
                        });
                    })
            });
     };
    return (
        <div className =" paymentDetails">
            <form onSubmit={ handleSubmit}>

                <div className= "Shipping">
                <h2>Shipping Address</h2>
                <FormInput className="FormInput"
                type ="text"
                required
                name="recipientName"
                handleChange={e=>setRecipentName(e.target.value)}
                placeholder="Recipient Name" 
                value={recipentName}>
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                name="line1"
                required
                handleChange ={e => handleShipping(e)}
                value={shippingAddress.line1}
                placeholder="Address Line 1" >
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                value={shippingAddress.line2}
                name="line2"
                handleChange ={e => handleShipping(e)}
                placeholder="Address Line 2" >
                </FormInput>
                <div className="formRow countryDropDown formInput">
                <CountryDropdown
                name="country"
                required
                onChange={val=>handleShipping({
                    target:{
                        name:'country',
                        value:val
                    }
                })}
                value={shippingAddress.country}
                valueType="short"
                />
                </div>
               
                <FormInput className="FormInput"
                type ="text"
                name="state"
                required
                handleChange ={e => handleShipping(e)}
                value={shippingAddress.state}
                placeholder="State" >
                    
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                name="city"
                required
                handleChange ={e => handleShipping(e)}
                value={shippingAddress.city}
                placeholder="City" >
                </FormInput>
                <FormInput className="FormInput"
                type ="number"
                handleChange ={e => handleShipping(e)}
                name="postalCode"
                required
                value={shippingAddress.postalCode}
                placeholder="PostalCode" >
                </FormInput>
                </div>
                <hr>
                </hr>
                <div className= "Shipping">
                <h2>Billing Address</h2>
                <FormInput className="FormInput"
                type ="text"
                required
                name="nameOnCard"
                placeholder="Name on Card"
                handleChange={e=>setnameOnCard(e.target.value)}
                value={nameOnCard} >
                </FormInput>
                <FormInput className="FormInput"
                value={billingAddress.line1}
                required
                handleChange ={e => handleBilling(e)}
                name="line1"
                type ="text"
                placeholder="Address Line 1" >
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                handleChange ={e => handleBilling(e)}
                value={billingAddress.line2}
                name="line2"
                placeholder="Address Line 2" >
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                required
                name="state"
                handleChange ={e => handleBilling(e)}
                value={billingAddress.state}
                placeholder="State" >
                </FormInput>
                <FormInput className="FormInput"
                type ="text"
                handleChange ={e => handleBilling(e)}
                value={billingAddress.city}
                name="city"
                required
                placeholder="City" >
                </FormInput>
                <FormInput className="FormInput"
                type ="number"
                name="postalCode"
                required
                handleChange ={e => handleBilling(e)}
                value={billingAddress.postalCode}
                placeholder="postalCode" >
                </FormInput>
                <div className="formRow countryDropDown formInput">
                <CountryDropdown
               required
                value={billingAddress.country}
                valueType="short"
                onChange={val=>handleBilling({
                    target:{
                        name:'country',
                        value:val
                    }
                })}
                
                />
                </div>
                </div>
                <hr>
                </hr>
                <div className= "Shipping">
                <h2>Card Details</h2>
                <CardElement
                options={
                configCardElement
                }/>
                </div>
                <Button type="submit">Proceed to Pay</Button>

            </form>
                
        </div>
    )
}

export default PaymentDetails;