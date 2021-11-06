import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import Icons from "../../components/Icons/Icons";
import {dadoQuery} from "../../lib/queries/dadosQueries";
import {useEffect} from "react";
import {updateDado} from "../../lib/mutations/dadoMutation";
import { Box } from '@chakra-ui/react'

const Card = ({ data }) => {
    const { card } = data;
    console.log(card)
    const [updtDado] = useMutation(updateDado);
    if(!card){
        return "Loading...";
    }
    console.log(card)
    const { data: dado, loading } = useQuery(dadoQuery,{
        variables:{
            id: parseInt(card.dadoId)
        }
    })
    useEffect(() => {
        if(dado && card){
            updtDado({
                variables:{
                    input:{
                        where: {
                            id: parseInt(card.dadoId),
                        },
                        data:{
                            visits: parseInt(dado.dado.visits) + 1
                        }
                    }
                }
            }).then(() => console.log("Welcome!"))
                .catch(e => console.log(JSON.stringify(e)))
        }
    },[dado])
    return (
        <Box className="w-screen h-screen flex items-center justify-center bg-yellow-300">
            <Box
                bg="black"
                borderRadius="lg"
                className="
                w-3/6
                h-2/4
                flex
                shadow-md"
            >
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="w-1/3 h-full">
                    <img className="
                            rounded-full
                            mb-1
                            w-32
                            h-32
                            2xl:w-52
                            2xl:h-52
                            bg-gray-100"
                         src={card?.data?.cardData?.img?.imgLink}
                    />
                    <div
                        className="
                        text-white
                        font-bold
                        bg-black
                        w-full
                        2xl:text-2xl
                        text-center"
                    >
                        { card?.data?.cardData?.name }
                    </div>
                    <Box
                        mb="8"
                        className="text-white text-xs 2xl:text-lg bg-black w-full text-center"
                    >
                        { card?.data?.cardData?.title }
                    </Box>
                    <Icons
                        className="text-white mt-2 2xl:mt-4 flex"
                        logosClass="mx-2"
                        logos={card?.data?.cardData?.logos}
                    />
                </Box>
                <Box bg="tomato" display="flex" flexDirection="column" justifyContent="center" className="w-2/3 h-full text-white p-8">
                    <Box>
                        <Box
                            bg="tomato"
                            className="font-semibold 2xl:text-2xl"
                        >
                            { card?.data?.cardData?.about }
                        </Box>
                        <Box
                            bg="tomato"
                            className="text-sm pl-2 w-full h-full resize-none 2xl:text-xl"
                        >
                            { card?.data?.cardData?.desc }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export const getServerSideProps = async (ctx) => {
    const client = createApolloClient();
    const {cardId} = ctx.query
        const { data } = await client.query({
            query: gql`
                query card($id: ID!){
                    card(id: $id){
                        dadoId
                        data
                    }
                }
            `,
            variables:{
                id: parseInt(cardId),
            }
        })
    return { props: { data } }
}

export default Card;
