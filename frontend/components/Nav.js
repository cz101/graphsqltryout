import Link from "next/link"
import NavStyles from "./styles/NavStyles"
export default function Nav(){
    return (
        <NavStyles>
            <Link href="/products"><a>products</a></Link>     
            <Link href="/sell"><a>Sell</a></Link> 
            <Link href="/orders"><a>orders</a></Link> 
            <Link href="/account"><a>account</a></Link>  
        </NavStyles>

    )
}