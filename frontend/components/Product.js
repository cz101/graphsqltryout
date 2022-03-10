//import {ItemStyles} from './styles/ItemStyles';
import ItemStyles from './styles/ItemStyles';

export default function Product({ product })  {  
    return (
    
        <ItemStyles>
               <img
                src={product?.photo?.image?.publicUrlTransformed}
                alt={product.name}
                />
      
        </ItemStyles> )   
   // return (<p>{product.name}</p> )  
}