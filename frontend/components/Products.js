import { useQuery, useEffect } from '@apollo/client';
import {gql} from 'graphql-tag';
//import { perPage } from '../config';
import styled from 'styled-components';
import Product from './Product';


export const All_PRODUCTS_QUERY = gql`
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

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products(){

  const {data , error , loading} = useQuery(All_PRODUCTS_QUERY)

 //   console.log(data , error , loading)

    if (loading){return <p>loading</p>}
    if (error){return <p>Error : {erro.message}</p>}
    return (
        <div>
            <ProductsListStyles>
            { data.allProducts.map((product) => (
                    <Product key={product.id} product={product} />          ))}
            </ProductsListStyles>
           
        </div>
    )
    
    }