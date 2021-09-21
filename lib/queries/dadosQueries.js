import {gql} from "@apollo/client";

export const dadoQuery = gql`
    query dado($id:ID!){
        dado(id: $id){
            visits
            updated_at
        }
    }
`
