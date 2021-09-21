import { gql } from "@apollo/client";

export const CardsQuery = gql`
    query cards($userId: Int!) {
        cards(userId: $Int) {
            dadoId
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
