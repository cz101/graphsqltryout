import styled from 'styled-components'
import SickButton from './styles/SickButton';
import { useState } from 'react';
import nProgress from 'nprogress';

import { loadStripe } from '@stripe/stripe-js'
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
  } from '@stripe/react-stripe-js';

const CheckoutFormStyles = styled.form`
box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
border: 1px solid rgba(0, 0, 0, 0.06);
border-radius: 5px;
padding: 1rem;
display: grid;
grid-gap: 1rem;
`;
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    


 async function handleSubmit(e){
        e.preventDefault()
        setLoading(true);
        console.log("we are doing some workhere ") 


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
          });

          console.log(paymentMethod);
          // 4. Handle any errors from stripe
          if (error) {
            setError(error);
            return; // stops the checkout from happening
          }
    }

    return (
    
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
            <p>card</p>
            <CardElement/>
            <SickButton>Checkout</SickButton>
        </CheckoutFormStyles>
    
    );
  }

  function Checkout() {

    return(
        <Elements stripe={stripeLib}>
            <CheckoutForm/>
        </Elements>
    )



  }
  export {Checkout}