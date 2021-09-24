import Menu from "../../components/Menu/Menu";
import createApolloClient from "../../lib/apolloClient";
import {gql, useMutation} from "@apollo/client";
import Link from "next/link"
import {toast} from "react-toastify";
import {deleteCurriculum} from "../../lib/mutations/curriculumMutation";
import {useState} from "react";
import CardOneUpdate from "../../components/Cards/CardOne/cardOneUpdate";
import CurrEdit from "../../components/Curriculum/CurrEdit";
import Button from "../../components/Button";

const MyCurriculums = ({ userId, data }) => {
    const {curricula} = data;
    const [openModal, setOpenModal] = useState(false);
    const [openCurrUpdate, setOpenCurrUpdate] = useState(false)
    const [curriculumId, setCurriculumId] = useState();
    const [deleteOneCurriculum] = useMutation(deleteCurriculum);
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
                console.log(e)
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
                        <Button className="m-2">New Curriculum</Button>
                    </Link>
                    <Link href={`/mycurriculums/${userId}`}>
                        <Button className="m-2">My Curriculums</Button>
                    </Link>
                </nav>
                <section className="w-full h-1 bg-gray-400 flex justify-center items-center">
                </section>
                <ul className="mt-8 mb-8">
                    {curricula &&
                    curricula?.map((curriculum, index) => {
                        console.log(curriculum)
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

MyCurriculums.getInitialProps = async (ctx) => {
    const client = createApolloClient();
    const {userId} = ctx.query;
    console.log(userId)
    const { data } = await client.query({
        query: gql`
            query curricula($userId: Int){
                curricula(where:{userId: $userId}){
                    id
                    created_at
                    data
                }
            }
        `,
        variables:{
            userId: parseInt(userId),
        }
    })
    return { userId, data }
}

MyCurriculums.auth = true;
export default MyCurriculums;
