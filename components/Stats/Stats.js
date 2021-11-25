import {useQuery} from "@apollo/client";
import { Box } from "@chakra-ui/layout";
import {dadoQuery} from "../../lib/queries/dadosQueries";

const Stats = ({ id, setModal }) => {
    const { data, loading } = useQuery(dadoQuery,{
        variables:{
            id: parseInt(id)
        }
    })
    const handleData = (data) => {
        const date= new Date(Date.parse(data));
        return (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
    if(!data) return null;
    return(
        <Box className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <fieldset className="bg-gray-200 w-1/4 h-1/4 text-center rounded flex flex-col items-center">
                <p className="mt-14"><span>Visits: </span><span>{data.dado.visits}</span></p>
                <p
                    className="flex flex-col"
                ><span>Visitado pela última vez:</span><span>{handleData(data.dado.updated_at)}</span></p>
                <button
                    className="mt-4 bg-blue-500 rounded w-20"
                    onClick={() => setModal(false)}
                >
                    Fechar
                </button>
            </fieldset>
        </Box>
    )
}

export default Stats;
