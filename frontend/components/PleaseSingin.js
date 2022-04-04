
import { useUser } from "./User"
import {SignIn} from ""
export default function  PleaseSignin({childrean}){

    const me= useUser()
    if (!me ) reurn (<SignIn />)

    reurn (childrean)
   
}