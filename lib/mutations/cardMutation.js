import { gql } from "@apollo/client";

export const createCard = gql`
    mutation createCard($input:createCardInput ) {
    createCard(input: $input) {
        card{
            id
            data
        }
    }
}`;

export const updateCard = gql`
    mutation updateCard($input:updateCardInput ) {
        updateCard(input: $input) {
            card{
                data
            }
        }
    }
`

export const deleteCard = gql`
    mutation deleteCard($input: deleteCardInput){
        deleteCard(input:$input){
            card{
                data
            }
        }
    }

`
