import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import Icons from "../../components/Icons/Icons";
import {dadoQuery} from "../../lib/queries/dadosQueries";
import {useEffect} from "react";
import {updateDado} from "../../lib/mutations/dadoMutation";
import { Box } from '@chakra-ui/react'

const Card = ({ data }) => {
    const { card } = data;
    const [updtDado] = useMutation(updateDado);
    if(!card){
        return "Loading...";
    }
   const colors = card?.data?.cardData?.colors;
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
            })
                .catch(e => console.error(JSON.stringify(e)))
        }
    },[dado])
    return (
        <Box
            bg={colors.bgColor || colors.auxiliarColor}
            className="w-screen h-screen flex items-center justify-center"
        >
            <Box
                color={colors.auxiliarColor}
                bg={`${colors.profileColor}`}
                borderRadius="lg"
                className="
                w-3/6
                h-2/4
                flex
                shadow-md"
            >
                <Box
                    color={colors.alternativeText || colors.auxiliarColor}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    className="w-1/3 h-full">
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
                    <Box
                        bg={colors.profileColor}
                        className="
                        font-bold
                        bg-black
                        w-full
                        2xl:text-2xl
                        text-center"
                    >
                        { card?.data?.cardData?.name }
                    </Box>
                    <Box
                        mb="8"
                        bg={colors.profileColor}
                        className="text-xs 2xl:text-lg w-full text-center"
                    >
                        { card?.data?.cardData?.title }
                    </Box>
                    <Icons
                        className="mt-2 2xl:mt-4 flex"
                        logosClass="mx-2"
                        logos={card?.data?.cardData?.logos}
                        color={colors.secondaryColor}
                    />
                </Box>
                <Box bg={colors.secondaryColor} display="flex" flexDirection="column" justifyContent="center" className="w-2/3 h-full p-8">
                    <Box
                        color={colors.alternativeText || colors.textColor}
                    >
                        <Box
                            bg={colors.bgColor || colors.auxiliarColor}
                            className="font-semibold 2xl:text-2xl"
                            borderRadius="4px 4px 0 0"
                            p="4px"
                        >
                            { card?.data?.cardData?.about }
                        </Box>
                        <Box
                            bg={colors.borderColor}
                            color={colors.auxiliarColor}
                            borderRadius="0 0 4px 4px"
                            p="8px"
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
