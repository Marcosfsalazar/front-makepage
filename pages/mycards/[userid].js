import Menu from "../../components/Menu/Menu";
import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import Link from "next/link"
import CardOneUpdate from "../../components/Cards/CardOne/cardOneUpdate";
import {useEffect, useState} from "react";
import {deleteCard} from "../../lib/mutations/cardMutation";
import {toast} from "react-toastify";
import Button from "../../components/Button";
import {GET_CARDS} from "../../lib/queries/cardQueries";

const MyCards = ({ userid }) => {
    const { data, loading } = useQuery(GET_CARDS, {
        variables:{
            userId: parseInt(userid),
        }
    })
    const [openCardUpdate, setOpenCardUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [cards, setCards] = useState();
    const [cardId, setCardId] = useState();
    const [deleteOneCard] = useMutation(deleteCard,{
        refetchQueries:[
            {
                query: GET_CARDS,
                variables:{
                    userId: parseInt(userid),
                }
            }
        ]
    });
    const handleData = (data) => {
        const date= new Date(Date.parse(data));
        return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
    const handleOpenEdit = (id) => {
        setCardId(id);
        setOpenCardUpdate(true);
    }
    const handleDelete = (id) => {
        deleteOneCard({
            variables:{
                input:{
                    where:{
                        id: parseInt(id)
                    }
                }
            }
        })
            .then(async (response) => {
                if(response){
                    toast.configure()
                    toast('Excluido com sucesso!',{
                        position: "bottom-center",
                        autoClose: 3000,
                        closeOnClick: true,
                        type: "error",
                    })
                }
            })
            .catch(e => {
                toast.configure()
                toast('Algo deu errado!',{
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    type: "error",
                })
            })
        setOpenModal(false);
    }

    const handleCardDeleteModal = (id) => {
        setOpenModal(true);
        setCardId(id);
    }
    useEffect(() => {
        setCardList(data?.cards);
        setCards(data?.cards);
    },[data, data?.cards])
    if(loading || !data){
        return <>loading...</>
    }
    return (
        <div className="flex">
           <Menu/>
            <section className="flex w-full flex-col">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Link href={`/dashboard/cards/${userid}`}>
                        <Button className="m-2">Dashboard</Button>
                    </Link>
                    <Link href={`/builder/card/${userid}`}>
                        <Button className="m-2">New Card</Button>
                    </Link>
                    <Link href={`/mycards/${userid}`}>
                        <Button className="m-2">My Cards</Button>
                    </Link>
                </nav>
                <section className="w-full h-1 bg-gray-400 flex justify-center items-center">
                </section>
                <section className="w-full h-full">
                    <ul className="mt-8 mb-8">
                        {cards &&
                            cardList?.map((card, index) => {
                                return(
                                    <li key={index} className="
                                    px-2
                                    my-2
                                    border-t
                                    border-b
                                    flex
                                    items-center
                                    justify-between
                                    h-12">
                                        <h1 className="font-bold">{ index }</h1>
                                        <span>{card?.data?.cardData?.name}</span>
                                        <span className="flex">
                                            <h1 className="font-bold px-2">criado:</h1>
                                            <span>{handleData(card.created_at)}</span>
                                        </span>
                                        <Link
                                            href={`/card/${card.id}`}
                                        >
                                            <button
                                                className="
                                                bg-green-500
                                                h-6 w-14
                                                rounded
                                                hover:bg-green-400"
                                            >
                                                Link
                                            </button>
                                        </Link>
                                        <button
                                            className="
                                                bg-gray-300
                                                h-6 w-14
                                                rounded
                                                hover:bg-gray-200"
                                            onClick={() => handleOpenEdit(card.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="
                                                bg-red-500
                                                h-6 w-14
                                                rounded
                                                hover:bg-red-600"
                                            onClick={() => handleCardDeleteModal(card.id) }
                                        >
                                            Excluir
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                {openCardUpdate &&
                    <div
                        className="
                        justify-center
                        items-center
                        flex
                        overflow-x-hidden
                        overflow-y-auto
                        fixed
                        inset-0
                        z-50
                        outline-none
                        focus:outline-none"
                    >
                        <div
                            className="
                                w-full
                                h-full
                                absolute
                                bg-black
                                opacity-60
                            "
                        >
                        </div>
                        <div
                            className="z-50 w-3/4 h-full flex items-center justify-center"
                        >
                            <CardOneUpdate cardId={cardId} setOpenCard={setOpenCardUpdate}/>
                        </div>
                    </div>
                }
                {openModal &&
                <div
                    className="
                        justify-center
                        items-center
                        flex
                        overflow-x-hidden
                        overflow-y-auto
                        fixed
                        inset-0
                        z-50
                        outline-none
                        focus:outline-none"
                >
                    <div
                        className="
                            bg-gray-100
                            w-1/3
                            h-1/4
                            mb-40
                            flex
                            flex-col
                            items-center
                            rounded
                            border-2
                            border-black
                        "
                    >
                        <span
                            className="
                                font-bold
                                mt-4
                                text-xl
                            "
                        >
                            Excluir esse item permanentemente?
                        </span>
                        <div
                            className="flex items-center h-full"
                        >
                            <button
                                className="
                                                bg-gray-400
                                                h-6 w-20
                                                rounded
                                                mx-2
                                                hover:bg-gray-200"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="
                                                bg-red-500
                                                h-6 w-20
                                                rounded
                                                mx-2
                                                hover:bg-red-600"
                                onClick={() => handleDelete(cardId) }
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
                }
            </section>
        </div>
    )
}

export async function getServerSideProps (ctx) {
    const {userid} = ctx.query;
    return {
        props: { userid }
    }
}

MyCards.auth = true;
export default MyCards;
