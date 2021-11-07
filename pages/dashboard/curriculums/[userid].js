import createApolloClient from "../../../lib/apolloClient";
import {gql} from "@apollo/client";
import {useState} from "react";
import Menu from "../../../components/Menu/Menu";
import Stats from "../../../components/Stats/Stats";
import Link from "next/link";
import Button from "../../../components/Button";

const Dashboard = ({ userid, data }) => {
    const { curricula } = data;
    const [dataId, setDataId] = useState();
    const [openModal, setOpenModal] = useState(false);
    if(!curricula){
        return "Loading...";
    }
    const handleStats = (id) => {
        setDataId(id)
        setOpenModal(true)
    }
    return (
        <div className="flex">
            <Menu/>
            <section className="flex w-full flex-col">
                <nav
                    className="
                        bg-white
                        w-full
                        flex
                        justify-center
                    "
                >
                    <Link href={`/dashboard/curriculums/${userid}`}>
                        <Button className="m-2">Dashboard</Button>
                    </Link>
                    <Link href={`/builder/curriculum/${userid}`}>
                        <Button className="m-2">New Curriculum</Button>
                    </Link>
                    <Link href={`/mycurriculums/${userid}`}>
                        <Button className="m-2">My Curriculums</Button>
                    </Link>
                </nav>
                <section className="w-full h-1 bg-gray-400 flex justify-center items-center">
                </section>
                <section className="w-full h-full">
                    <ul className="mt-8 mb-8">
                        {curricula &&
                        curricula?.map((card, index) => {
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
                                    <span>{card?.data?.name}</span>
                                    <button
                                        className="bg-yellow-300 rounded w-28 hover:bg-yellow-500"
                                        onClick={() => handleStats(card.dadoId)}
                                    >
                                        Estatisticas
                                    </button>
                                </li>
                            )
                        })
                        }
                    </ul>
                </section>
            </section>
            {openModal &&
            <Stats id={dataId} setModal={setOpenModal}/>
            }
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const client = createApolloClient();
    const {userid} = ctx.query;
    const { data } = await client.query({
        query: gql`
            query curricula($userId: Int){
                curricula(where:{userId: $userId}){
                    id
                    dadoId
                    created_at
                    data
                }
            }
        `,
        variables:{
            userId: parseInt(userid),
        }
    })
    return { props: { userid, data } }
}

Dashboard.auth = true;
export default Dashboard;
