import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import checkout from './checkout';

// make a fake graphql tagged template literal
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token:String!): Order

    }
  `,
  resolvers: {
    Mutation: {
        addToCart,
        checkout
    },
  },
});



/*
import{ graphqlSchemeExtention }from "@keystone-next/keystone/schema" 


export const extendGraphqlSchema = graphqlSchemeExtention({



    typeDefs: `
        type mutation { 
            addtoCart(productID:ID):CartItem
        }
    `,
    reslovers:{
        mutation:{
            addtoCart : function(){

                console.log("add to cart")
            }

        }


    }
})
*/