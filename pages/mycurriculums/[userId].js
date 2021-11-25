import { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation, useQuery} from "@apollo/client";
import Link from "next/link"
import {toast} from "react-toastify";
import {deleteCurriculum} from "../../lib/mutations/curriculumMutation";
import {useState} from "react";
import CurrEdit from "../../components/Curriculum/CurrEdit";
import Button from "../../components/Button";
import {GET_CARDS} from "../../lib/queries/cardQueries";
import {GET_CURRS} from "../../lib/queries/CurrQueries";
import ShareButton from "../../components/ShareButton";
import {useSession} from "next-auth/client";

const MyCurriculums = ({ userId }) => {
    const { data, loading } = useQuery(GET_CURRS, {
        variables:{
            userId: parseInt(userId),
        }
    })
    const [curricula, setCurricula] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openCurrUpdate, setOpenCurrUpdate] = useState(false)
    const [curriculumId, setCurriculumId] = useState();
    const [{ user }] = useSession();
    const [deleteOneCurriculum] = useMutation(deleteCurriculum, {
        refetchQueries:[
            {
                query: GET_CURRS,
                variables:{
                    userId: parseInt(userId),
                }
            }
        ]
    });
    const handleDelete = (id) => {
        deleteOneCurriculum({
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
                        type: "info",
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
        setCurriculumId(id);
    }
    const handleOpenEdit = (id) => {
        setCurriculumId(id);
        setOpenCurrUpdate(true);
    }
    const handleData = (data) => {
        const date= new Date(Date.parse(data));
        return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
   useEffect(() => {
        setCurricula(data?.curricula);
    },[data])
    if(loading || !data){
        return <>loading...</>
    }
    return (
        <div className="flex">
            <Menu />
            <section className="w-full h-full">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Link href={`/dashboard/curriculums/${userId}`}>
                        <Button className="m-2">Dashboard</Button>
                    </Link>
                    <Link href={`/builder/curriculum/${userId}`}>
                        <Button className="m-2">Novo Curriculum</Button>
                    </Link>
                    <Link href={`/mycurriculums/${userId}`}>
                        <Button className="m-2">Meus Curriculums</Button>
                    </Link>
                </nav>
                <section className="w-full h-1 bg-gray-400 flex justify-center items-center">
                </section>
                <ul className="mt-8 mb-8">
                    {curricula &&
                    curricula?.map((curriculum, index) => {
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
                                <span>{curriculum?.data?.name}</span>
                                <span className="flex">
                                            <h1 className="font-bold px-2">criado:</h1>
                                            <span>{handleData(curriculum.created_at)}</span>
                                        </span>
                                <Link
                                    href={`/curriculum/${curriculum.id}`}
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
                                    onClick={() => handleOpenEdit(curriculum.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="
                                                bg-red-500
                                                h-6 w-14
                                                rounded
                                                hover:bg-red-600"
                                    onClick={() => handleCardDeleteModal(curriculum.id)}
                                >
                                    Excluir
                                </button>
                                <ShareButton name={user?.username} pagetype={"card"} link={`${window.location.origin}/curriculum/${curriculum.id}`}/>
                            </li>
                        )
                    })
                    }
                </ul>
            </section>
            {openModal &&
            <div
                className="
                        justify-center
                        items-center
                        flex
                        overflow-x-hidden
                        overflow-y-auto
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
                            onClick={() => handleDelete(curriculumId) }
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
            }
            {openCurrUpdate &&
            <div
                className="
                        justify-center
                        items-center
                        flex
                        w-screen
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
                                w-screen
                                h-full
                                absolute
                                bg-white
                            "
                >
                </div>
                <div
                    className="z-50 w-screen h-full flex items-center justify-center"
                >
                    <CurrEdit currId={curriculumId} userId={userId} setOpenModal={setOpenCurrUpdate}/>
                </div>
            </div>
            }
        </div>
    )
}

export async function getServerSideProps (ctx) {
    const {userId} = ctx.query;
    return {
        props:{ userId }
    }
}

MyCurriculums.auth = true;
export default MyCurriculums;
