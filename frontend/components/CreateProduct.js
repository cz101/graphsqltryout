import React from 'react'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import DisplayError from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router'

const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION(
  $name: String!
  $description: String!
  $price: Int!
  $image: Upload
) {
  createProduct(
    data: {
      name: $name
      description: $description
      price: $price
      status: "AVAILABLE"
      photo: { create: { image: $image, altText: $name } }
    }
  ) {
    id
    price
    description
    name
  }
}
`

export default  function CreateProduct() {

  const {inputs, handleChange,clearForm,resetForm} = useForm({
    image:'',
    name: "shoes",
    price : 112,
    description: "the blah blah"
    
  })

  //const [name , setName] = useState('productname')
 // those are opject 

 const [createProduct, { loading, error, data }] = useMutation(
  CREATE_PRODUCT_MUTATION,
  {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  }
)

console.log(createProduct)


  return (
    <Form onSubmit ={async (e)=>{
            e.preventDefault(), 
            console.log(inputs)
            //const res =await createProduct()
            //console.log(res)
            await createProduct()
            clearForm()
            Router.push{
              pathname: `/product/${res.data.createProduct.id}`
            }

            }}>
      <DisplayError />
      <fieldset disabled={loading} aria-busy>

      <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
                <input type="text" 
                        id="name" 
                        name="name"
                        placeholder="name"
                        value={inputs.name}
                        onChange={ handleChange}                     
                />
        
        </label>
        <label htmlFor="price">
          Price
                <input type="number" 
                        id="price" 
                        name ="price"
                        placeholder="price"
                        value={inputs.price}
                        onChange= {handleChange}  
                />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

      

      <button type="submit"> + Add Product</button>

    </fieldset>
    </Form>
  )
}
