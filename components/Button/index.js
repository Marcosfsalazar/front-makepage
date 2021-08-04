import React from 'react';

const Button = React.forwardRef(function Button({children, className, ...props},ref){
    return(
        <button
            className={`
            ${className}
            rounded
            font-medium
            text-base
            p-2
            px-4   
            `}
            {...props}
        >
            { children }
        </button>
    )
})

export default Button;
