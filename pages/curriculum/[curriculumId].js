import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import {updateDado} from "../../lib/mutations/dadoMutation";
import {dadoQuery} from "../../lib/queries/dadosQueries";
import {useEffect} from "react";

const Curriculum = (data) => {
    const  curriculum  = data?.curriculum?.data
    const [updtDado] = useMutation(updateDado);
    console.log('data', data)
    if(!curriculum){
        return "Loading...";
    }
    const { data: dado, loading } = useQuery(dadoQuery,{
        variables:{
            id: parseInt(data.curriculum.dadoId)
        }
    })
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
    return (
        <div className="w-screen h-screen flex items-center bg-white">
            <section className="bg-gray-400 w-2/5 h-screen flex-col">
                <div className="
                    flex-col
                    text-center
                    justify-center
                    justify-items-center
                    h-full
                    w-full
                    px-4
                    py-8
                    ">
                    <img className="
                        rounded-full
                        m-auto
                        mb-2
                        w-32
                        h-32
                        2xl:w-60
                        2xl:h-60
                        bg-gray-100
                        self-center"
                         src={curriculum.image.imgLink}
                            />
                        <span className="font-bold 2xl:text-2xl block">{curriculum.name}</span>
                        <span className="text-xs 2xl:text-sm font-mono">{curriculum.degree}</span>
                    { curriculum?.contact?.length > 0 &&
                        <ul className="pt-4 2xl:text-xl">
                            <div className="font-bold font-mono 2xl:text-2xl">Contato</div>
                            {
                                curriculum.contact.map(contact => (
                                    <>
                                        <li>
                                            <span className="font-bold mr-2">
                                                E-mail:
                                            </span>
                                            <span>
                                                {contact.mail}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="font-bold mr-2">
                                                Tel.:
                                            </span>
                                            <span>
                                                 {contact.phone}
                                            </span>
                                        </li>
                                    </>
                                ))
                            }
                        </ul>
                    }
                    { curriculum?.skills?.length > 0 &&
                        <ul className="pt-4 2xl:text-xl">
                            <div className="font-bold font-mono 2xl:text-2xl">Skills</div>
                            {
                                curriculum.skills.map(skill => (
                                    <li>
                                        <span className="font-mono">
                                            { skill.skill }
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </section>
            <section
                className="w-3/5 h-screen p-20 2xl:text-xl"
            >
                { curriculum.personalDesc &&
                    <div>
                        <span className="font-bold text-xl 2xl:text-2xl">Sobre</span>
                        <p className="py-1 px-4 2x">
                            { curriculum.personalDesc }
                        </p>
                    </div>
                }
                { curriculum?.study?.length > 0 &&
                    <div className="mt-2">
                        <span className="font-bold text-xl 2xl:text-2xl">Formação Acadêmica</span>
                        <ul className="py-1 px-4">
                            {
                                curriculum.study.map(study => (
                                    <li className="flex-col">
                                        <span className="font-bold block">{study.college}</span>
                                        <span className="py-1 px-4">
                                            { study.desc }
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
                {curriculum?.experience?.length > 0 &&
                    <div className="mt-2">
                        <span className="font-bold text-xl 2xl:text-2xl">Experiência</span>
                        <ul className="py-1 px-4">
                            {
                                curriculum.experience.map(exp => (
                                    <li className="flex-col">
                                        <span className="font-bold block">{exp.local}</span>
                                        <span className="py-1 px-4">
                                            {exp.desc}
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </section>
        </div>
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
