import Link from "next/link"
import { useCart } from "../lib/cartState"
import NavStyles from "./styles/NavStyles"
import { useUser } from "./User"
import SignOut from "./SignOut"


export default function Nav(){

    const user= useUser()
    const { openCart } = useCart()
    //console.log(user)
    return (
        <NavStyles>
            <Link href="/products"><a>products</a></Link>   
            {  
                user && (
                <>
                    <Link href="/sell"><a>sell</a></Link> 
                    <Link href="/orders"><a>orders</a></Link> 
                    <Link href="/account"><a>account</a></Link>  
                    <SignOut/>
                    <button type="button" onClick={openCart}>Open Cart</button>
                </>
              )
            } 
            { !user && (
                <>
                    <Link href="/signin"><a>singin</a></Link> 
                </>
              )

            }   
            </NavStyles>

    )
}