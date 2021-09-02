const LiGray = ({ children }) => {
    return (
        <li
            className="
                bg-gray-300
                p-2
            "
        >
            { children }
        </li>
    )
}

const LiWhite = ({ children }) => {
    return (
        <li
            className="
                bg-gray-100
                p-2
            "
        >
            { children }
        </li>
    )
}

const Menu = ({ username }) => {
    return (
        <nav className="bg-gray-300 w-1/4 h-screen flex-col">
            <div className="
            flex-col
            text-center
            justify-center
            justify-items-center
            content-center
            items-center
            w-full
            px-4
            py-8
            ">
                <div className="
                rounded-full
                m-auto
                w-32
                h-32
                bg-gray-100
                self-center"
                >
                </div>
                <span>{ username }</span>
            </div>
            <ul>
                <LiGray>Configurações</LiGray>
                <LiWhite>Perfil</LiWhite>
                <LiGray>Ajuda</LiGray>
                <LiWhite>Loja</LiWhite>
                <LiGray>Home</LiGray>
                <LiWhite>Lorem Ipsum</LiWhite>
            </ul>
        </nav>
    )
}

export default Menu;
