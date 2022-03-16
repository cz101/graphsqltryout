import Products from "../../components/Products"
import Pagination from "../../components/Pagination"

import { useRouter } from "next/router"

export default function OrderPage(){

    const {query }= useRouter()
    console.log ("-------------")
  //  console.log(router)

    const page = parseInt(query.page)
return (
    <div>
        <Pagination page={ page|| 1}/>
        <Products/>
        <Pagination page={ page || 1}/>
    </div>
)

}