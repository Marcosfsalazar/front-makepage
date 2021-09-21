import { gql } from "@apollo/client";

export const currQuery = gql`
    query curriculum($currId:ID!){
        curriculum(id: $currId){
            data
        }
    }
`
