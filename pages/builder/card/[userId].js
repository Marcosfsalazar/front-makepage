import Menu from "../../../components/Menu/Menu";
import Button from "../../../components/Button";
import CardOneEdit from "../../../components/Cards/CardOne/CardOneEdit";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {createCard} from "../../../lib/mutations/cardMutation";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CardOnePreview from "../../../components/Cards/CardOne/CardOnePreview";
import Link from 'next/link';

const CardBuilder = ({ data }) => {
    const {username, userId} = data;
    const [cardData, setCardData] = useState({});
    const [openPreview, setOpenPreview] = useState(false);
    const [link, setLink] = useState('')
    const [saveCard] = useMutation(createCard)
    const handleSaveCard = (cardData) => {
            saveCard({
                variables:{
                    input:{
                        data:{
                            userId: parseInt(userId),
                            data:{
                                cardData
                            }
                        }
                    }
                }
            })
                .then(async (response) => {
                    if(response){
                        console.log(response)
                        toast.configure()
                        toast('Salvo com sucesso!',{
                            position: "bottom-center",
                            autoClose: 3000,
                            closeOnClick: true,
                            type: "success",
                        })
                        setLink(response.data.createCard.card.id);
                    }
                })
                .catch(e => {
                    console.log(e)
                })
    }

    return(
        <div className="flex">
            <Menu/>
            <main className="flex flex-col w-screen">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Button className="m-2">Dashboard</Button>
                    <Button className="m-2">New Card</Button>
                    <Link href={`/mycards/${userId}`}>
                        <Button className="m-2">My Cards</Button>
                    </Link>
                </nav>
                <section className="w-full h-20 bg-gray-200 flex justify-center items-center">
                    <h1 className="font-bold text-xl">New Card</h1>
                </section>
                { link &&
                    <span className="self-center flex">
                        <div className="text-red-500 font-bold mr-2">CardLink:</div>
                        <Link href={`/card/${link}`}>Clique aqui</Link>
                    </span>
                }
                <section className="flex justify-center mt-12">
                    <CardOneEdit setData={setCardData}/>
                    {openPreview &&
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
                                bg-white
                                h-screen
                                w-screen
                                flex
                                flex-col
                                items-center
                                justify-center"
                            >
                                <CardOnePreview data={cardData}/>
                                <div
                                    className="self-center mt-8"
                                >
                                    <Button
                                        className="bg-yellow-500 mx-2"
                                        onClick={() => setOpenPreview(false)}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        className="bg-green-500 mx-2"
                                        onClick={() => handleSaveCard(cardData)}
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                </section>
                <div
                    className="self-center mt-8"
                >
                    <Button
                        className="bg-yellow-500 mx-2"
                        onClick={() => setOpenPreview(true)}
                    >
                        Preview
                    </Button>
                    <Button
                        className="bg-green-500 mx-2"
                        onClick={() => handleSaveCard(cardData)}
                    >
                        Salvar
                    </Button>
                </div>
            </main>
        </div>
    )
}

CardBuilder.getInitialProps = async (ctx) => {
    const data = ctx.query
    return { data }
}

CardBuilder.auth = true;
export default CardBuilder;
