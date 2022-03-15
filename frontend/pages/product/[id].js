import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import SingleProduct from '../../components/SingleProduct'

export default function SingleProductPage({query}) {

    /*
    const SINGLE_ITEM_QUERY = gql`
    query {
        Product(where :{
          id : "622c566404f9e9042002ff0c"
        })
        {
          name
          price
          description   
        }
      
      }
   `

 const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY)
 
 console.log(data, loading,error)
 */
 return <SingleProduct id={query.id}/>
}