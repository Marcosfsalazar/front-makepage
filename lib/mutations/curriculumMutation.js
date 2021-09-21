import { gql } from "@apollo/client";

export const createCurriculum = gql`
    mutation createCurriculum($input:createCurriculumInput ) {
        createCurriculum(input: $input) {
            curriculum{
                id
                data
            }
        }
    }`;

export const updateCurriculum = gql`
    mutation updateCurriculum($input:updateCurriculumInput ) {
        updateCurriculum(input: $input) {
            curriculum{
                data
            }
        }
    }
`

export const deleteCurriculum = gql`
    mutation deleteCurriculum($input: deleteCurriculumInput){
        deleteCurriculum(input:$input){
            curriculum{
                data
            }
        }
    }

`
