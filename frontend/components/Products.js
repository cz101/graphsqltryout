import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const All_PRODUCTS_QUERY = gql`
query All_PRODUCTS_QUERY {
    allProducts{
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
` 

export default function Products(){

    const {data , error , loading} = useQuery(All_PRODUCTS_QUERY)
    console.log(data , error , loading)
    return (
        <div>
            <p> Products</p>
        </div>
    )
    
    }