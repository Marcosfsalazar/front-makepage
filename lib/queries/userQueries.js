import { gql } from "@apollo/client";

const userQuery = gql`
query user($id: ID!) {
    user(id: $id) {
        id
        username
        email
    }
}`
