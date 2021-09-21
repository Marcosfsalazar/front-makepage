import { useSession, signOut } from 'next-auth/client'
import {useRouter} from "next/router";
import Menu from "../../components/Menu/Menu";
import Link from "next/link";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {userUpdate} from "../../lib/mutations/userMutations";
import {toast} from "react-toastify";

export default function Home(){
    const router = useRouter();
    const [{ user }, loading] = useSession()
    const [edit, setEdit] = useState(false);
    const [username, setUserName] = useState(user.username);
    const [mail, setMail] = useState(user.email);
    const [updateUser] = useMutation(userUpdate);
    const handleUpdateUser = (username, mail) => {
        updateUser({
            variables:{
                input:{
                    where: {
                        id: parseInt(user.id),
                    },
                    data:{
                        username,
                        email: mail,
                    }
                }
            }
        })
            .then(res => {
                if(res){
                    toast.configure()
                    toast('Salvo com sucesso!',{
                        position: "bottom-center",
                        type: "success",
                        autoClose: 3000,
                        closeOnClick: true,
                    })
                    setEdit(false);
                }
            })
            .catch(err => {
                toast.configure()
                toast('Erro ao salvar!',{
                    position: "bottom-center",
                    type:"error",
                    autoClose: 3000,
                    closeOnClick: true,
                })
            })
    }
    return (
        <>
            <section className="flex w-screen h-auto">
                <Menu/>
                <section
                    className="w-full h-screen border flex flex-col items-center justify-center"
                >
                    {!edit &&
                    <div className="w-72 h-full flex flex-col items-center justify-center mb-24">
                        <div className="font-bold text-xl 2xl:text-2xl mb-4">User</div>
                        <span
                            className="border px-2 w-full text-center font-bold font-mono border-gray-600 m-1"
                        >
                            {user.username}
                        </span>
                        <span
                            className="border px-2 w-full text-center font-bold font-mono border-gray-600 m-1"
                        >
                            {user.email}
                        </span>
                        <button
                            className="
                            border px-2 w-full text-center font-bold font-mono border-gray-600 m-1
                            hover:text-white
                            hover:bg-black
                            "
                            onClick={() => setEdit(true)}
                        >
                            EDITAR
                        </button>
                    </div>
                    }
                    {edit &&
                    <div className="w-72 h-full flex flex-col items-center justify-center mb-24">
                        <div className="font-bold text-xl 2xl:text-2xl mb-4">User</div>
                        <input
                            className="border px-2 w-full text-center font-bold font-mono border-gray-600 m-1
                            bg-black
                            text-white
                            "
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <input
                            className="border px-2 w-full text-center font-bold font-mono border-gray-600 m-1
                            bg-black
                            text-white
                            "
                            value={mail}
                            onChange={e => setMail(e.target.value)}
                        />
                        <button
                            className="
                            border px-2 w-full text-center font-bold font-mono border-gray-600 m-1
                            hover:text-white
                            hover:bg-black
                            "
                            onClick={() => handleUpdateUser(username, mail)}
                        >
                            Salvar
                        </button>
                    </div>
                    }
                </section>
            </section>
        </>
    )
}
Home.auth=true;
