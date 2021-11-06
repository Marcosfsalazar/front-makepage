import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import {updateDado} from "../../lib/mutations/dadoMutation";
import {dadoQuery} from "../../lib/queries/dadosQueries";
import {useEffect} from "react";
import {Grid, GridItem, Box, Image, List, ListItem} from "@chakra-ui/react"
import Outdoor from "../../components/Outdoor";

const Curriculum = (data) => {
    const  curriculum  = data?.curriculum?.data
    const [updtDado] = useMutation(updateDado);
    if(!curriculum){
        return "Loading...";
    }
    const { data: dado, loading } = useQuery(dadoQuery,{
        variables:{
            id: parseInt(data.curriculum.dadoId)
        }
    })
    console.log('curr', curriculum)
    useEffect(() => {
        if(dado && curriculum){
            console.log(dado)
            updtDado({
                variables:{
                    input:{
                        where: {
                            id: parseInt(data.curriculum.dadoId),
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
    const themeDefine = () => {switch(curriculum.theme){
        case 'tomato':
            return {
                secondaryColor: "white",
                textColor: "black",
                profileColor: "tomato",
                auxiliarColor: "papayawhip",
                borderColor: "black",
                skillsBg: "black",
                nameColor: "gray.800",
                outdoorColor: "black"
            }
        case 'white':
            return{
                secondaryColor: "white",
                textColor: "#050505",
                profileColor: "#29339B",
                auxiliarColor: "white",
                borderColor: "#050505",
                skillsBg: "white",
                skillsBgHover: "#050505",
                nameColor: "#29339B",
                outdoorColor: "#29339B"
            }
        case 'black':
            return{
                secondaryColor: "white",
                textColor: "black",
                profileColor: "black",
                auxiliarColor: "white",
                borderColor: "#555568",
                skillsBg: "white",
                skillsBgHover: "#004E98",
                nameColor: "#004E98",
                outdoorColor: "#004E98",
                outdoorSkillColor: "white",
            }
        case 'darkGray':
            return{
                secondaryColor: "#211e20",
                textColor: "#e9efec",
                profileColor: "#555568",
                auxiliarColor: "#211e20",
                borderColor: "#555568",
                skillsBg: "#211e20",
                skillsBgHover: "#e9efec",
                nameColor: "#555568",
                outdoorColor: "#555568"
            }
        case 'smooth':
            return{
                secondaryColor: "#f1f2da",
                textColor: "#00303b",
                profileColor: "#ff7777",
                auxiliarColor: "#ffce96",
                borderColor: "#555568",
                skillsBg: "#ff7777",
                skillsBgHover: "#ffce96",
                nameColor: "#00303b",
                outdoorColor: "#00303b"
            }
        case 'darkSmooth':
            return{
                secondaryColor: "#332c50",
                textColor: "#e2f3e4",
                profileColor: "#e2f3e4",
                auxiliarColor: "#46878f",
                borderColor: "#e2f3e4",
                skillsBg: "#46878f",
                skillsBgHover: "#94e344",
                nameColor: "#94e344",
                outdoorColor: "#00303b"
            }
        default:
            return {
                secondaryColor: "white",
                textColor: "black",
                profileColor: "tomato",
                auxiliarColor: "papayawhip",
                borderColor: "black",
                skillsBg: "black",
                nameColor: "gray.800",
                outdoorColor: "black"
            }

    }}
    const theme = themeDefine();
    return (
        <Grid
            templateColumns={"repeat(10,1fr)"}
            templateRows="repeat(6, 1fr)"
            color={`${theme.textColor}`}
            w={"100vw"}
            h={"100vh"}
        >
            <GridItem
                colSpan={3}
                rowSpan={2}
                bg={theme.profileColor}
                display="flex"
                alignItems="center"
                borderRight={`1px solid ${theme.borderColor}`}
            >
                <Image
                    borderRadius="full"
                    className="
                        m-auto
                        w-40
                        h-40
                        2xl:w-60
                        2xl:h-60
                        self-center"
                    objectFit="cover"
                    boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
                    src={curriculum.image.imgLink}
                />
            </GridItem>
            <GridItem
                colSpan={7}
                rowSpan={2}
                bg={theme.secondaryColor}
                padding="2rem"
                borderLeft={`1px solid ${theme.borderColor}`}
                borderBottom={`1px solid ${theme.borderColor}`}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    w="fit-content"
                >
                    <Box
                        fontWeight="600"
                        fontFamily="mono"
                        color={`${theme.nameColor}`}
                        fontSize={{ md:"1rem", lg: "2rem", "2xl":"4rem" }}
                        letterSpacing="2px"
                    >
                        {curriculum.name}
                    </Box>
                    <Box
                        alignSelf="end"
                        className="text-xs 2xl:text-sm font-mono"
                    >
                        {curriculum.degree}
                    </Box>
                </Box>
                <Box
                    h="60%"
                    display="flex"
                >
                    { curriculum?.contact?.length > 0 &&
                    <List
                        fontWeight="600"
                        fontFamily="mono"
                        color={`${theme.textColor}`}
                        fontSize={{ md:"0.5rem", lg: "0.75rem", "2xl":"1rem" }}
                        className="pt-4"
                        alignSelf="end"
                        display="flex"
                    >
                        {
                            curriculum.contact.map(contact => (
                                <ListItem mr="2em">
                                    <ListItem>
                                            <span className="font-bold mr-2">
                                                E-mail:
                                            </span>
                                        <span>
                                                {contact.mail}
                                            </span>
                                    </ListItem>
                                    <ListItem>
                                            <span className="font-bold mr-2">
                                                Tel.:
                                            </span>
                                        <span>
                                                 {contact.phone}
                                            </span>
                                    </ListItem>
                                </ListItem>
                            ))
                        }
                    </List>
                    }
                </Box>
            </GridItem>
            <GridItem colSpan={3} rowSpan={4} bg={theme.profileColor} borderRight={`1px solid ${theme.borderColor}`}>
                <Box
                    w="100%"
                    h="100%"
                    padding="8px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Outdoor
                        text="SKILLS"
                        textColor={`${theme.outdoorSkillColor || theme.outdoorColor}`}
                        bgColor="none"
                        letterSpacing="2px"
                    />
                        { curriculum?.skills?.length > 0 &&
                        <List
                            display="flex"
                            flexDirection="column"
                            pt="8px"
                            w="100%"
                        >
                            {
                            curriculum.skills.map(skill => (
                                <ListItem
                                    marginBottom="2px"
                                    w="100%"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    p="4px"
                                    fontWeight="600"
                                    borderRadius="4px"
                                    bg={theme.secondaryColor}
                                    boxShadow="0 4px 8px 0 rgba(0,0,0,0.2);"
                                    _hover={{
                                        bg:`${theme.skillsBgHover || theme.secondaryColor}`,
                                        color:`${theme.skillsBg}`,
                                        cursor:"pointer"
                                    }}
                                >
                                        <Box
                                            fontSize={{ md:"12px", lg: "16px", "2xl":"24px" }}
                                        >
                                            { skill.skill }
                                        </Box>
                                </ListItem>
                            ))
                        }
                    </List>
                    }
                </Box>
            </GridItem>
            <GridItem colSpan={7} rowSpan={4} bg={theme.auxiliarColor} borderTop={`1px solid ${theme.borderColor}`} borderLeft={`1px solid ${theme.borderColor}`}>
                <Box
                    w="100%"
                    h="100%"
                    display="flex"
                    justifyContent="space-around"
                    fontSize={{ md:"12px", lg: "16px", "2xl":"24px" }}
                    fontWeight="500"
                    fontFamily="mono"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p="8px"
                    >
                        <Outdoor
                            text="SOBRE"
                            h="42px"
                            w="150px"
                            bgColor="none"
                            textColor={`${theme.outdoorColor}`}
                        />
                        { curriculum.personalDesc &&
                        <div>
                            <p className="py-1 px-4 2x">
                                { curriculum.personalDesc }
                            </p>
                        </div>
                        }
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p="8px"
                    >
                        <Outdoor
                            text="FORMAÇÃO"
                            h="42px"
                            w="150px"
                            bgColor="none"
                            textColor={`${theme.outdoorColor}`}
                        />
                        { curriculum?.study?.length > 0 &&
                        <Box>
                            <List>
                                {
                                    curriculum.study.map(study => (
                                        <ListItem p="2px" className="flex-col">
                                            <span className="font-bold block">{study.college}</span>
                                            <span>
                                            { study.desc }
                                        </span>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                        }
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p="8px"
                    >
                        <Outdoor
                            text="EXPERIÊNCIA"
                            h="42px"
                            w="150px"
                            bgColor="none"
                            textColor={`${theme.outdoorColor}`}
                        />
                        { curriculum?.study?.length > 0 &&
                        <Box>
                            <ul>
                                {curriculum?.experience?.length > 0 &&
                                <Box>
                                    <List>
                                        {
                                            curriculum.experience.map(exp => (
                                                <ListItem p="2px" className="flex-col">
                                                    <span className="font-bold block">{exp.local}</span>
                                                    <span className="py-1 px-4">
                                            {exp.desc}
                                        </span>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Box>
                                }
                            </ul>
                        </Box>
                        }
                    </Box>
                </Box>
            </GridItem>
        </Grid>
    )
}

export const getServerSideProps = async (ctx) => {
    const client = createApolloClient();
    const {curriculumId} = ctx.query
    const { data } = await client.query({
        query: gql`
            query curriculum($id: ID!){
                curriculum(id: $id){
                    dadoId
                    data
                }
            }
        `,
        variables:{
            id: parseInt(curriculumId),
        }
    })
    console.log(data)
    return { props: data }
}

export default Curriculum;
