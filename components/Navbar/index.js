import React, {useState} from "react";
import Link from 'next/link'
import Button from "../Button";

export default function Navbar({ showNav }) {
    const [navbarOpen, setNavbarOpen] = useState(false);
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
                        <Link href="/">
                            <a
                                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            >
                                CardMaker
                            </a>
                        </Link>
                        { showNav &&
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
                        !showNav &&
                        <Link href="/">
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
                                outline-none
                                justify-self-end
                                focus:outline-none
                                hover:bg-gray-500
                                "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none  " viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </button>
                        </Link>

                    }
                    { showNav &&
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
                                    <Link href="/join/login">
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
                                    <Link href="/join/register">
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
