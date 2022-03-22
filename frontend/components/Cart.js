import CartStyles from './styles/CartStyles'
import {useUser} from './User.js'
import Supreme from  './styles/Supreme'
//import header from './'
import styled from 'styled-components';
import fromatMoney  from '../lib/formatMoney';
import calcTotalPrice from'../lib/calcTotalPrice'
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({cartItem}){
    const { product } = cartItem;
    if (!product) return null;

    console.log(product)
    return (<CartItemStyles>
      <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name}/>
    
      <div>
        <h3>{product.name}</h3>
        <p>
          {fromatMoney(product.price  * cartItem.quantity)}
         
        </p>
      </div>
      </CartItemStyles>   
        )
}
export default function Cart(){

    const me = useUser()
    //const data = useCart()
    const { cartOpen, closeCart } = useCart();
   // console.log(data)
    if (!me) return null
  //  console.log(me.cart)
   
   return(
            <CartStyles open ={cartOpen}>
                <header>
                    <Supreme>{me.name}'s Cart</Supreme>
                    <button onClick={closeCart}>&times;</button>
                </header>


                <ul>
                { me.cart.map((cartItem) => (<CartItem key={cartItem.id} cartItem= {cartItem}/>))}

                </ul>
                    <footer>

                        <p>
                            {fromatMoney(calcTotalPrice(me.cart))}

                        </p>
                    </footer>

                </CartStyles>
            )
}