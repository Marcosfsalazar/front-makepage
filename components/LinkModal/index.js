import React from 'react';
import {Box} from "@chakra-ui/react";

const LinkModal =  ({ url, setModal }) => {
    return(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <Box
                display="flex"
                justifyContent="center"
                className="bg-gray-200 w-1/4 h-1/4 text-center rounded"
            >
                <Box
                    alignSelf="center"
                    justifySelf="center"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    Link:
                    <span>{ url }</span>
                    <a href={url} className="text-blue-800" rel="noopener noreferrer" target="_blank">clique para visitar</a>
                    <button
                        className="mt-4 bg-red-500 rounded w-20"
                        onClick={() => setModal(false)}
                    >
                        Fechar
                    </button>
                </Box>
            </Box>
        </div>
    )
}

export default LinkModal;
