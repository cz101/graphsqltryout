
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "./User"

const SIGNOUT_MUTATION = gql`

    mutation {
        endSession
    }
`


export default function SignOut() {

    const [signout , {data, loading, error }] = useMutation(SIGNOUT_MUTATION, {
        refetchQueries : [{query :CURRENT_USER_QUERY}]
    })
    return (
        <button type ="button" onClick={signout}>Logout</button>
    )
}