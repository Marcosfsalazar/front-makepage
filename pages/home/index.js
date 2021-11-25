import { useSession, signOut } from 'next-auth/client'
import {useRouter} from "next/router";
import Menu from "../../components/Menu/Menu";
import Link from "next/link";

export default function Home(){
    const router = useRouter();
    const [{ user }, loading] = useSession()
    return (
        <>
            <section className="flex h-auto">
                <Menu/>
                <main className="bg-white w-full flex-col">
                    <div
                        className="
                        text-sm
                        leading-relaxed
                        inline-block
                        my-4
                        ml-12
                        py-2
                        whitespace-nowrap
                        uppercase
                        text-gray-500"
                    >
                        CardMaker
                    </div>
                    <div className="w-full flex justify-center">
                        <hr className="w-1/2 border border-gray-300"/>
                    </div>
                    <section className="
                    flex-col
                    justify-center
                    items-center
                    text-center
                    text-gray-500
                    ">
                        <h1
                            className="
                                font-bold
                                italic
                                text-3xl
                                mt-12
                            "
                        >
                            Bem-Vindo { user?.username }!
                        </h1>
                        <p
                            className="
                                text-base
                                italic
                                text-gray-400
                                my-4
                                w-1/2
                                mx-auto
                            "
                        >
                            Aqui você terá acesso a criação e monitoramento de virtual curriculum e
                            cards de forma simples e prática, com apenas alguns cliques!
                            Está pronto para começar?
                        </p>
                        <Link href={`/builder/card/${user?.id}`}>
                            <button
                                className="
                                    bg-gray-100
                                    w-full
                                    h-32
                                    my-8
                                    border-gray-300
                                    border-2
                                    border-dotted
                                    text-center
                                "
                            >
                                <span
                                    className="
                                    text-2xl
                                    text-gray-500
                                    "
                                >
                                    Cartão de Apresentação
                                </span>
                            </button>
                        </Link>
                        <Link href={`/builder/curriculum/${user?.id}`}>
                            <button
                                className="
                                bg-gray-100
                                w-full
                                h-32
                                my-8
                                border-gray-300
                                border-2
                                border-dotted
                                text-center
                            "
                            >
                            <span
                                className="
                                text-2xl
                                text-gray-500
                                "
                            >
                                Curriculum Virtual
                            </span>
                            </button>

                        </Link>
                    </section>
                </main>
            </section>
        </>
    )
}
Home.auth=true;
