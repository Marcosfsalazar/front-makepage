import Icons from "../../Icons/Icons";
import { Box } from "@chakra-ui/react"

const CardOneEdit = ({ data }) => {
    console.log(data)
    return(
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
                {data?.img?.imgLink ?
                    <img className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                         src={data?.img?.imgLink}
                         alt="profile picture"
                    />
                    :
                    <div className="
                        rounded-full
                        mt-6
                        mb-1
                        w-32
                        h-32
                        bg-gray-100"
                    />
                }
                <div
                    className="
                    text-white
                    font-bold
                    bg-black
                    w-full
                    text-center"
                >
                    { data?.name }
                </div>
                <Box
                    mb="8"
                    className="text-white text-xs bg-black w-full text-center"
                >
                    { data?.title }
                </Box>
                <Icons
                    className="text-white mt-2 flex"
                    logosClass="mx-2"
                    logos={data?.logos}
                />
            </Box>
            <Box bg="tomato" display="flex" flexDirection="column" justifyContent="center" className="w-2/3 h-full text-white p-8">
                <Box>
                    <Box
                        bg="tomato"
                        className="font-semibold 2xl:text-2xl"
                    >
                        { data?.about }
                    </Box>
                    <Box
                        bg="tomato"
                        className="text-sm pl-2 w-full h-full resize-none 2xl:text-xl"
                    >
                        { data?.desc }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CardOneEdit;
