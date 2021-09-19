import {useSession} from "next-auth/client";
import Link from 'next/link'

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

const Menu = () => {
    const [{user}] = useSession();
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
                mb-2
                w-32
                h-32
                bg-gray-100
                self-center"
                >
                </div>
                <span>{ user.username }</span>
            </div>
            <ul>
                <LiGray>Configurações</LiGray>
                <LiWhite>Perfil</LiWhite>
                <LiGray>Estatísticas</LiGray>
                <LiWhite>Ajuda</LiWhite>
                <LiGray><Link className="cursor-pointer" href="/home">Home</Link></LiGray>
            </ul>
        </nav>
    )
}

export default Menu;
