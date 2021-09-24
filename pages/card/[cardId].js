import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import Icons from "../../components/Icons/Icons";
import {dadoQuery} from "../../lib/queries/dadosQueries";
import {useEffect} from "react";
import {updateDado} from "../../lib/mutations/dadoMutation";

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
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-300">
            <div
                className="
                    bg-black
                    w-2/4
                    h-2/4
                    rounded
                    flex
                    shadow-lg"
            >
                <div className="flex flex-col items-center self-center mb-6 pt-0 2xl:self-center 2xl:mb-20 w-1/3">
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
                    <div
                        className="text-white text-xs 2xl:text-lg bg-black w-full text-center"
                    >
                        { card?.data?.cardData?.title }
                    </div>
                    <Icons
                        className="text-white mt-2 2xl:mt-4 flex"
                        logosClass="mx-2"
                        logos={card?.data?.cardData?.logos}
                    />
                </div>
                <div className="bg-red-500 w-2/3 h-full text-white p-8 2xl:flex 2xl:pt-20">
                    <div className="mt-12">
                        <div
                            className="font-semibold bg-red-500 2xl:text-2xl"
                        >
                            { card?.data?.cardData?.about }
                        </div>
                        <div
                            className="text-sm pl-2 w-full h-full bg-red-500 resize-none 2xl:text-xl"
                        >
                            { card?.data?.cardData?.desc }
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
