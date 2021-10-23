import { gql } from "@apollo/client";

export const currQuery = gql`
    query curriculum($currId:ID!){
        curriculum(id: $currId){
            data
        }
    }
`

export const GET_CURRS = gql`
    query curricula($userId: Int){
        curricula(where:{userId: $userId}){
            id
            created_at
            data
        }
    }
`
