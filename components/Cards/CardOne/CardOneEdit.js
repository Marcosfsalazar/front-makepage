import Icons from "../../Icons/Icons";
import {useEffect, useState} from "react";
import Button from "../../Button";
import { SOCIALS } from "../../../utils/socials"

const CardOneEdit = ({ setData }) => {
    const [name, setName] = useState('Seu nome Aqui');
    const [title, setTitle] = useState('seu título aqui')
    const [about, setAbout] = useState('Sobre')
    const [desc, setDesc] = useState('Insira uma descrição...')
    const [logos, setLogos] = useState([]);
    const [link, setLink] = useState("");
    const [actualSelect, setActualSelect] = useState("twitter");
    const [fieldsetVisible, setFieldsetVisible] = useState(false);
    useEffect(() => {
        setData({
            name,title,about,desc,logos,link,actualSelect
        })
    },[name,title,about,desc,logos,link,actualSelect])
    const handleSaveLogos = (name, link) => {
        setLogos(logos => [{name:name, link:link},...logos]);
        return setFieldsetVisible(false);
    }
    return(
        <div
            className="
                bg-black
                w-8/12
                h-80
                flex
                shadow-md"
        >
            <div className="flex flex-col items-center w-1/3">
                <div className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                />
                <input
                    className="
                    text-white
                    font-bold
                    bg-black
                    w-full
                    text-center"
                    value={name}
                    onChange={ e =>setName(e.target.value)}
                />
                <input
                    className="text-white text-xs bg-black w-full text-center"
                    value={title}
                    onChange={ e =>setTitle(e.target.value)}
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
                    logos={logos}
                />
            </div>
            <div className="bg-red-500 w-2/3 h-full text-white p-8">
                <div className="mt-12">
                    <input
                        className="font-semibold bg-red-500"
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                    />
                    <textarea
                        className="text-sm pl-2 w-full h-40 bg-red-500 resize-none"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardOneEdit;
