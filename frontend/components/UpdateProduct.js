
import {  useMutation, useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'

const SINGLE_PRODUCT_QUERY = gql`
query SINGLE_PRODUCT_QUERY($id: ID!) {
  Product(where: { id: $id }) {
    id
    name
    description
    price
  }
}
`;

const UPDATE_PRODUCT_MUTATION = gql`
mutation UPDATE_PRODUCT_MUTATION(
  $id: ID!
  $name: String
  $description: String
  $price: Int
) {
  updateProduct(
    id: $id
    data: { name: $name, description: $description, price: $price }
  ) {
    id
    name
    description
    price
  }
}
`;
/*export default function UpdateProduct({id}){
    
 const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY,
    {
        variables :{id,}
    })
*/
export default function UpdateProduct({ id }) {
        // 1. We need to get the existing product
        const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
          variables: { id },
        })


const [
    updateProduct,
    { data: updateData, errror: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  //console.log(data)

  //const {inputs, handleChange,clearForm,resetForm} = useForm(data?.Product)

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    data?.Product ||{
        name: '',
        description: '',
        price: '',})
      
  if (loading) return <p>loading...</p>
  console.log(inputs);

 

return (

<Form 
    onSubmit ={async (e)=>{
           e.preventDefault()
           const res= await updateProduct({
                variables :{
                   id,
                   name: inputs.name,
                   description: inputs.description,
                   price: inputs.price,
           }})
           console.log(res);
            // console.log(inputs)
            // const res =await createProduct()
            // //console.log(res)
            // await createProduct()
            // clearForm()
            // Router.push({
            //   pathname: `/product/${res.data.createProduct.id}`
            //})
            }
    }>

      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy ={updateLoading}>

   

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

      

      <button type="submit"> Update Product</button>

    </fieldset>
    </Form>
)
}