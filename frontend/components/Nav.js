import Link from "next/link"
import NavStyles from "./styles/NavStyles"
import { useUser } from "./User"
import SignOut from "./SignOut"


export default function Nav(){

    const user= useUser()
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