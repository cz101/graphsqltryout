import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const REQUESTRESET_MUTATION = gql`
   mutation REQUESTRESET_MUTATION ($email: String!)
  {
    sendUserPasswordResetLink(email :$email){
        code,
        message

      }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ''
  });
  const [requestrest, { data, loading,error }] = useMutation(REQUESTRESET_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    //refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await requestrest();
    console.log(res);
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request to Reset the Pass</h2>
      <Error error={error} />
      <fieldset>
            {data?.sendUserPasswordResetLink === null && (
        <p>Success! Check your email for a link!</p>  
                )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label> 
        <button type="submit">Request</button>
      </fieldset>
    </Form>
  );
}
