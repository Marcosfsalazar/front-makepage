import { gql } from "@apollo/client";

export const CardsQuery = gql`
    query cards($userId: Int!) {
        cards(userId: $Int) {
            dadoId
            data
        }
    }
`

export const GET_CARDS = gql`
    query cards($userId: Int){
        cards(where:{userId: $userId}){
            id
            created_at
            data
        }
    }
`

export const cardQuery = gql`
    query card($cardId:ID!){
        card(id: $cardId){
            dadoId
            data
        }
    }
`
