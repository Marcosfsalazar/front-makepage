import React, {useState} from "react";
import Link from 'next/link'
import Button from "../Button";
import { LOGIN_PATH, REGISTER_PATH } from '../../lib/constants'
import {signOut, useSession} from "next-auth/client";
import {useRouter} from "next/router";

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [session, loading] = useSession()
    const isUser = !!session?.user
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
    const styles = {
        buttonGray: `
         bg-gray-600
         text-white
         hover:bg-gray-900
         hover:text-gray-100
        `,
        buttonWhite:`
         bg-white
         text-gray-600
         hover:bg-gray-100
         hover:text-gray-600
        `
    }
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-400">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link href={isUser ? "/home"  : "/"}>
                            <a
                                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            >
                                CardMaker
                            </a>
                        </Link>
                        { !isUser &&
                            <button
                                className="
                            text-white
                            cursor-pointer
                            text-xl
                            leading-none
                            px-3
                            py-1
                            border
                            border-solid
                            border-transparent
                            rounded
                            bg-transparent
                            block
                            lg:hidden
                            outline-none
                            focus:outline-none
                            hover:border-white
                            "
                                type="button"
                                onClick={() => setNavbarOpen(!navbarOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        }
                    </div>
                    {
                        isUser &&
                        <>
                        <Button
                            className="hover:bg-gray-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                        </>

                    }
                    { !isUser &&
                        <div
                            className={
                                "lg:flex flex-grow items-center" +
                                (navbarOpen ? " flex" : " hidden")
                            }
                            id="example-navbar-danger"
                        >
                            <div
                                className={`
                            flex
                            flex-col
                            lg:flex-row
                            lg:ml-auto
                            ${!navbarOpen && "space-x-2"}
                            `}>
                                <div>
                                    <Link href={LOGIN_PATH}>
                                        <Button
                                            className={
                                                !navbarOpen &&
                                                styles.buttonWhite
                                                || "hover:text-white"
                                            }
                                        >
                                            <span>Login</span>
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={REGISTER_PATH}>
                                        <Button
                                            className={
                                                !navbarOpen &&
                                                styles.buttonGray
                                                || "hover:text-white"
                                            }
                                        >
                                            <span>Register</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </>
    );
}
