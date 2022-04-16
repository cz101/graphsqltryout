import {render, waitFor} from '@testing-library/react'
import CreateProduct , {CREATE_PRODUCT_MUTATION}from '../components/CreateProduct'
import userEvent  from '@testing-library/user-event'
import Router from 'next/router'
import {fakeItem }from '../lib/testUtils'
import {ALL_PRODUCTS_QUERY} from '../components/Products'
import wait from 'waait'

import '@testing-library/jest-dom'

import { MockedProvider } from '@apollo/react-testing'
import { screen } from '@testing-library/react'
import { fieldNameFromStoreName } from '@apollo/client/cache'

const item = fakeItem()

jest.mock('next/router',()=>{
    push:jest.fn()
})

describe('<CreateProduct />', ()=>{


 it ('it match the snapshot',()=> {

        const {container ,debug} = render(
            
                <MockedProvider >
                    <CreateProduct/>
                </MockedProvider>
            )

     //debug();    
     expect(container).toMatchSnapshot();
   

     
    });

    it ('it test the form',async()=> {

        const {container ,debug} = render(
            
                <MockedProvider >
                    <CreateProduct/>
                </MockedProvider>
            )
            //await userEvent.type(screen.getByPlaceholderText(/Name/i),item.name);
            await userEvent.type(screen.getByPlaceholderText(/price/i),item.price.toString());
            await userEvent.type(screen.getByPlaceholderText(/description/i),item.description);
           
           // expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();

            expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
            expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
    }); 


    it('create a form to submit', async()=>{

        const mocks = [
            {
              request: {
                query: CREATE_PRODUCT_MUTATION,     
                variables: {
                  name: item.name,
                  description: item.description,
                  image: '',
                  price: item.price,
                },
              },
              result: {
                data: {
                  createProduct: {
                    ...item,
                    id: 'abc123',
                    __typename: 'Item',
                  },
                },
              },
            },
            {
              request:{
                  query:ALL_PRODUCTS_QUERY,
                  variables:{skip:0,first:2},
              },
              result:{ 
                  data: {allProducts:[item],},
               }, 
            
            },]
    

        const {container ,debug} = render(
            
            <MockedProvider mocks ={mocks}>
                <CreateProduct/>
            </MockedProvider>
        )
        //debug()


         //await userEvent.type(screen.getByPlaceholderText(/Name/i),item.name);
         await userEvent.type(screen.getByPlaceholderText(/price/i),item.price.toString());
         await userEvent.type(screen.getByPlaceholderText(/description/i),item.description);
         await userEvent.click(screen.getByText(/Add Product/i),item.description);
         await waitFor(()=>wait(2))
        // console.log(Route.push)
         expect (Router.push).toHavebeenCalled()
 
    });

})
