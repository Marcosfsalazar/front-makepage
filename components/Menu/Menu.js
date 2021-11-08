import {signOut, useSession} from "next-auth/client";
import Link from 'next/link'
import React from "react";
import {useRouter} from "next/router";
import { url_picture } from "../../lib/constants";

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
    const router = useRouter();
    const handleLogout = (e) => {
        e.preventDefault()
        signOut({
            redirect: false,
        })
            .then(() => {
                router.push('/')
            })
            .catch(e => {
                throw new Error(e)
            })
    }
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
                <img className="
                rounded-full
                m-auto
                mb-2
                w-32
                h-32
                bg-gray-100
                self-center"
                src={url_picture}
                >
                </img>
                <span>{ user.username }</span>
            </div>
            <ul>
                <LiWhite><Link className="cursor-pointer" href="/profile">Perfil</Link></LiWhite>
                <LiGray><Link className="cursor-pointer" href="/home">Início</Link></LiGray>
                <LiWhite>
                    <button
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </LiWhite>
            </ul>
        </nav>
    )
}

export default Menu;
