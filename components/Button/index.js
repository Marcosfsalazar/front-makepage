const Button = ({children, className, ...props}) =>{
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
}

export default Button;
