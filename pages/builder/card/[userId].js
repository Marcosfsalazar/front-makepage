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
import {createDado} from "../../../lib/mutations/dadoMutation";
import {Box} from "@chakra-ui/react";
import LinkModal from "../../../components/LinkModal";

const CardBuilder = ({ data }) => {
    const {username, userId} = data;
    const [cardData, setCardData] = useState({});
    const [openPreview, setOpenPreview] = useState(false);
    const [link, setLink] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [theme, setTheme] = useState('white')
    const [saveCard] = useMutation(createCard)
    const [saveDado] = useMutation(createDado)
    const handleSaveCard = (cardData) => {
            saveDado({
                variables:{
                    input:{
                        data:{
                            visits: 0
                        }
                    }
                }
            })
                .then(async (response) => {
                    saveCard({
                        variables:{
                            input:{
                                data:{
                                    dadoId: parseInt(response.data.createDado.dado.id),
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
                                toast.configure()
                                toast('Salvo com sucesso!',{
                                    position: "bottom-center",
                                    autoClose: 3000,
                                    closeOnClick: true,
                                    type: "success",
                                })
                                setLink(response.data.createCard.card.id);
                                setOpenModal(true)
                            }
                        })
                        .catch(e => {
                            console.error(e)
                            if(e?.message.includes("413")){
                                toast.configure()
                                toast('Limite de imagem excedido (700kb) !',{
                                    position: "bottom-center",
                                    autoClose: 3000,
                                    closeOnClick: true,
                                    type: "error",
                                })
                            }
                        })
                })
                .catch(e => {
                    console.error(e)
                })
    }

    const themeDefine = () => {switch(theme){
        case 'tomato':
            return {
                auxiliarColor: "papayawhip",
            }
        case 'white':
            return{
                bgColor: "#f2f2f2"
            }
        case 'black':
            return{
                bgColor:"#004E98",
            }
        case 'darkGray':
            return{
                bgColor: "#e9efec",
            }
        case 'smooth':
            return{
                auxiliarColor: "#ffce96",
            }
        case 'darkSmooth':
            return{
                auxiliarColor: "#46878f",
            }
        default:
            return {
                auxiliarColor: "papayawhip",
            }

    }}

    const bg = themeDefine();

    return(
        <Box className="flex bg-gray-200">
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
                    <Link href={`/dashboard/cards/${userId}`}>
                        <Button className="m-2">Dashboard</Button>
                    </Link>
                    <Button className="m-2">Novo Cartão</Button>
                    <Link href={`/mycards/${userId}`}>
                        <Button className="m-2">Meus cartões</Button>
                    </Link>
                </nav>
                <section className="w-full h-20 bg-gray-200 flex justify-center items-center">
                    <h1 className="font-bold text-xl">New Card</h1>
                </section>
                <Box
                    alignSelf="center"
                    mt="1rem"
                    textAlign="center"
                >
                    Tema
                    <select
                        onChange={(e)=>setTheme(e.target.value)}
                        className="border m-2 block"
                    >
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="tomato">Tomato</option>
                        <option value="darkGray">Dark Gray</option>
                        <option value="smooth">Smooth</option>
                        <option value="darkSmooth">Dark Smooth</option>
                    </select>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    className="mt-6 h-full"
                >
                    <CardOneEdit setData={setCardData} theme={theme}/>
                    {openPreview &&
                        <Box
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
                            <Box
                                bg={bg.bgColor || bg.auxiliarColor}
                                className="
                                h-screen
                                w-screen
                                flex
                                flex-col
                                items-center
                                justify-center"
                            >
                                <CardOnePreview data={cardData} theme={theme}/>
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
                            </Box>
                        </Box>
                    }
                </Box>
                <div
                    className="self-center mt-2 mb-6"
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
                {openModal &&
                    <LinkModal url={`${window.location.origin}/card/${link}`} setModal={setOpenModal}/>
                }
            </main>
        </Box>
    )
}

CardBuilder.getInitialProps = async (ctx) => {
    const data = ctx.query
    return { data }
}

CardBuilder.auth = true;
export default CardBuilder;
