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

export const userUpdate = gql`
    mutation updateUser($input:updateUserInput ) {
        updateUser(input: $input) {
            user{
                username
                email
            }
        }
    }
`;
