import {gql} from "@apollo/client";

export const createDado = gql`
    mutation createDado($input:createDadoInput ) {
        createDado(input: $input) {
            dado{
                id
                visits
            }
        }
    }`;

export const updateDado = gql`
    mutation updateDado($input:updateDadoInput ) {
        updateDado(input: $input) {
            dado{
                visits
                updated_at
            }
        }
    }
`
