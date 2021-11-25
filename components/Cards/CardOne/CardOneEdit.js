import Icons from "../../Icons/Icons";
import {useEffect, useState} from "react";
import Button from "../../Button";
import { SOCIALS } from "../../../utils/socials"
import { Box, Input, Textarea, FormLabel } from "@chakra-ui/react"

const CardOneEdit = ({ setData, theme }) => {
    const [name, setName] = useState('Seu nome Aqui');
    const [title, setTitle] = useState('seu título aqui')
    const [about, setAbout] = useState('Sobre')
    const [desc, setDesc] = useState('Insira uma descrição...')
    const [logos, setLogos] = useState([]);
    const [link, setLink] = useState("");
    const [img, setImg] = useState();
    const [actualSelect, setActualSelect] = useState("twitter");
    const [fieldsetVisible, setFieldsetVisible] = useState(false);
    const imageHandler = (e) => {
        const reader = new FileReader(e);
        reader.onload = () => {
            if(reader.readyState === 2 ){
                setImg({imgLink: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    useEffect(() => {
        setData({
            name,title,about,desc,logos,link,actualSelect,img, theme, colors
        })
    },[name,title,about,desc,logos,link,actualSelect, img, theme])
    const handleSaveLogos = (name, link) => {
        setLogos(logos => [{name:name, link:link},...logos]);
        return setFieldsetVisible(false);
    }
    const themeDefine = () => {switch(theme){
        case 'tomato':
            return {
                secondaryColor: "white",
                textColor: "black",
                profileColor: "tomato",
                auxiliarColor: "papayawhip",
                borderColor: "black",
            }
        case 'white':
            return{
                secondaryColor: "white",
                textColor: "#050505",
                profileColor: "#29339B",
                auxiliarColor: "white",
                borderColor: "#050505",
                bgColor: "#f2f2f2"
            }
        case 'black':
            return{
                secondaryColor: "white",
                textColor: "white",
                profileColor: "black",
                auxiliarColor: "white",
                borderColor: "black",
                bgColor:"#004E98"
            }
        case 'darkGray':
            return{
                secondaryColor: "#211e20",
                textColor: "#e9efec",
                profileColor: "#555568",
                auxiliarColor: "#211e20",
                borderColor: "#555568",
                bgColor: "#e9efec",
                alternativeText: "#211e20"
            }
        case 'smooth':
            return{
                secondaryColor: "#f1f2da",
                textColor: "#00303b",
                profileColor: "#ff7777",
                auxiliarColor: "#ffce96",
                borderColor: "#555568",
                alternativeText:"#00303b",
            }
        case 'darkSmooth':
            return{
                secondaryColor: "#332c50",
                textColor: "#e2f3e4",
                profileColor: "#e2f3e4",
                auxiliarColor: "#46878f",
                borderColor: "#e2f3e4",
            }
        default:
            return {
                secondaryColor: "white",
                textColor: "black",
                profileColor: "tomato",
                auxiliarColor: "papayawhip",
            }

    }}

    const colors = themeDefine();

    return(
        <Box
            bg={`${colors.profileColor}`}
            borderRadius="lg"
            className="
                w-3/5
                h-3/5
                flex
                shadow-md"
        >
            <Box
                color={colors.alternativeText || colors.auxiliarColor}
                className="flex flex-col items-center w-1/3"
            >
                { img ?
                    <img className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        flex
                        items-center
                        justify-center
                        bg-gray-100"
                         src={img?.imgLink}
                         alt="profile image"
                    />
                    :
                    <div className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        flex
                        items-center
                        justify-center
                        bg-gray-100"
                    />

                }
                <FormLabel
                    bg={colors.profileColor}
                    className="
                        border-2
                        border-gray-500
                        rounded
                        flex
                        z-50
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
                </FormLabel>
                <Input
                    bg={colors.profileColor}
                    className="
                    font-bold
                    bg-black
                    w-full
                    text-center"
                    value={name}
                    onChange={ e =>setName(e.target.value)}
                />
                <Input
                    bg={colors.profileColor}
                    className="text-xs w-full text-center"
                    value={title}
                    onChange={ e =>setTitle(e.target.value)}
                />
                <Button
                    className="mt-0"
                    onClick={() => setFieldsetVisible(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={colors.auxiliarColor}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Button>
                {fieldsetVisible &&
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <fieldset className="bg-gray-200 w-1/4 h-1/4 text-center rounded flex flex-col items-center">
                            <div className="font-semibold text-black mt-2">Insira uma rede</div>
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
                                <label htmlFor="url" className="mr-52 text-black font-semibold">link:</label>
                                <input
                                    className="w-30 text-white bg-black rounded"
                                    id="url"
                                    value={link}
                                    onChange={e => setLink(e.target.value)}
                                />
                                <Box color="black" className="flex">
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
                                </Box>
                        </fieldset>
                    </div>
                }
                <Icons
                    className="text-white flex"
                    logosClass="mx-2"
                    logos={logos}
                    color={colors.secondaryColor}
                />
            </Box>
            <Box bg={colors.secondaryColor} color="white" className="w-2/3 h-full p-8">
                <Box color={colors.alternativeText || colors.textColor} className="mt-24">
                    <Input
                        className="font-semibold"
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                        bg={colors.bgColor || colors.auxiliarColor}
                    />
                    <Textarea
                        className="text-sm pl-2 w-full h-40 resize-none"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        bg={colors.borderColor}
                        color={colors.auxiliarColor}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default CardOneEdit;
