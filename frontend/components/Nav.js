import Link from "next/link"

export default function Nav(){
    return (
        <nav>
            <Link href="/products"><a>products</a></Link>     
            <Link href="/Sell"><a>Sell</a></Link> 
            <Link href="/orders"><a>orders</a></Link> 
            <Link href="/account"><a>account</a></Link>  
        </nav>

    )
}