import {useEffect, useState} from "react";
import Button from "../../Button";
import { SOCIALS } from "../../../utils/socials"
import Icons from "../../Icons/Icons";
import {useMutation, useQuery} from "@apollo/client";
import {cardQuery} from "../../../lib/queries/cardQueries";
import {updateCard} from "../../../lib/mutations/cardMutation";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CardOneUpdate = ({ cardId, setOpenCard }) => {
    const [updtCard] = useMutation(updateCard);
    const { data, loading } = useQuery(cardQuery,{
        variables:{
            cardId: cardId
        }
    })
    const [cardData, setCardData] = useState({});
    const [logos, setLogos] = useState([]);
    const [link, setLink] = useState("");
    const [actualSelect, setActualSelect] = useState("twitter");
    const [fieldsetVisible, setFieldsetVisible] = useState(false);
    const [img, setImg] = useState();
    useEffect(() => {
        setCardData(data?.card.data.cardData);
        setLogos(data?.card.data.cardData.logos);
        setImg({imgLink:data?.card?.data?.cardData?.img?.imgLink})
    },[data])
    useEffect(() => {
        setCardData(data  => ({...data, logos}))
    },[logos])
    const handleSaveLogos = (name, link) => {
        setLogos(logos => [{name:name, link:link},...logos]);
        return setFieldsetVisible(false);
    }
    const imageHandler = (e) => {
        const reader = new FileReader(e);
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImg({imgLink: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleUpdateCards = (newData) => {
        updtCard({
            variables:{
                input:{
                    where: {
                        id: parseInt(cardId),
                    },
                    data:{
                        data:{
                            cardData: {...newData, img: {...img}}
                        }
                    }
                }
            }
        })
            .then(res => {
                if(res){
                    toast.configure()
                    toast('Salvo com sucesso!',{
                        position: "bottom-center",
                        type: "success",
                        autoClose: 3000,
                        closeOnClick: true,
                    })
                    setOpenCard(false);
                }
            })
            .catch(err => {
                toast.configure()
                toast('Erro ao salvar!',{
                    position: "bottom-center",
                    type:"error",
                    autoClose: 3000,
                    closeOnClick: true,
                })
            })
    }
    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div
                className="
                bg-black
                w-8/12
                h-80
                flex
                shadow-md"
            >
                <div className="flex flex-col items-center w-1/3">
                    <img className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                         src={img?.imgLink}
                         alt="profile picture"
                    />
                    <label
                        className="
                        border-2
                        border-gray-500
                        rounded
                        flex
                        z-50
                        bg-white
                        mt-50
                        top-64
                        cursor-pointer
                        hover:bg-gray-100
                        absolute
                        items-center
                        justify-center
                    "
                    >
                        <input
                            className="
                        hidden"
                            type="file"
                            onChange={imageHandler}
                        />
                        add file
                    </label>
                    <input
                        className="
                    text-white
                    font-bold
                    bg-black
                    w-full
                    text-center"
                        value={cardData?.name}
                        onChange={e => setCardData(data => ({...data, name: e.target.value}))}
                    />
                    <input
                        className="text-white text-xs bg-black w-full text-center"
                        value={cardData?.title}
                        onChange={ e => setCardData(data => ({...data, title: e.target.value}))}
                    />
                    <Button
                        className="mt-4"
                        onClick={() => setFieldsetVisible(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Button>
                    {fieldsetVisible &&
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <fieldset className="bg-gray-200 w-1/4 h-1/4 text-center rounded flex flex-col items-center">
                            <div className="font-semibold mt-2">Insira uma rede</div>
                            <select
                                className="w-1/2 text-white bg-black mt-4"
                                value={actualSelect}
                                onChange={e => setActualSelect(e.target.value)}
                            >
                                {
                                    SOCIALS.map(social => (
                                            <option value={social} key={social}>
                                                {social.charAt(0).toUpperCase() + social.slice(1)}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                            <label htmlFor="url" className="mr-52 font-semibold">link:</label>
                            <input
                                className="w-30 text-white bg-black rounded"
                                id="url"
                                value={link}
                                onChange={e => setLink(e.target.value)}
                            />
                            <div className="flex">
                                <Button
                                    className="h-6 text-sm bg-red-500 flex items-center mx-1 mt-2"
                                    onClick={() => setFieldsetVisible(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    className="h-6 text-sm bg-green-500 flex items-center mx-1 mt-2"
                                    onClick={() => handleSaveLogos(actualSelect, link)}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </fieldset>
                    </div>
                    }
                    <Icons
                        className="text-white mt-2 flex"
                        logosClass="mx-2"
                        logos={cardData?.logos}
                    />
                </div>
                <div className="bg-red-500 w-2/3 h-full text-white p-8">
                    <div className="mt-12">
                        <input
                            className="font-semibold bg-red-500"
                            value={cardData?.about}
                            onChange={e => setCardData(data => ({...data, about: e.target.value}))}
                        />
                        <textarea
                            className="text-sm pl-2 w-full h-40 bg-red-500 resize-none"
                            value={cardData?.desc}
                            onChange={e => setCardData(data => ({...data, desc: e.target.value}))}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button
                    className="bg-red-500 m-1"
                    onClick={() => setOpenCard(false)}
                >
                    Fechar
                </Button>
                <Button
                    className="bg-green-500 m-1"
                    onClick={() => handleUpdateCards(cardData)}
                >
                    Salvar
                </Button>
            </div>
        </div>
    )
}

export default CardOneUpdate;
