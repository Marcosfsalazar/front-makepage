import React from 'react';
import {Box} from "@chakra-ui/react";

const Outdoor = ({ bgColor, text, textColor, ...props }) => {
    return(
        <Box
            bgColor={bgColor || "tomato"}
            textColor={textColor || "white"}
            borderRadius="100"
            w="256px"
            h="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
            fontSize={{ md:"1rem", lg: "1.5rem", "2xl":"2rem" }}
            {...props}
        >
                { text }
        </Box>
    )
}

export default Outdoor;
