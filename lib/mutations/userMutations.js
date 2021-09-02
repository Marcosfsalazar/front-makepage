import { gql } from "@apollo/client";

export const userRegister = gql`
    mutation Register($input: UsersPermissionsRegisterInput!) {
        register(input: $input) {
            jwt
            user {
                id
                username
                email
            }
        }
    }`;
