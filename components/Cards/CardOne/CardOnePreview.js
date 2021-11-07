import Icons from "../../Icons/Icons";
import { Box } from "@chakra-ui/react"

const CardOneEdit = ({ data, theme }) => {

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
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                className="w-1/3 h-full"
                color={colors.alternativeText || colors.auxiliarColor}
            >
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
                <Box
                    bg={colors.profileColor}
                    className="
                    font-bold
                    w-full
                    text-center"
                >
                    { data?.name }
                </Box>
                <Box
                    mb="8"
                    bg={colors.profileColor}
                    className="text-xs w-full text-center"
                >
                    { data?.title }
                </Box>
                <Icons
                    className="mt-2 flex"
                    logosClass="mx-2"
                    logos={data?.logos}
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
                        { data?.about }
                    </Box>
                    <Box
                        bg={colors.borderColor}
                        color={colors.auxiliarColor}
                        borderRadius="0 0 4px 4px"
                        p="8px"
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
