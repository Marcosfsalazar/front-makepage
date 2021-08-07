import { useSession, signOut } from 'next-auth/client'
import {useRouter} from "next/router";
export default function ProtectedPage(){
    const router = useRouter();
    return (
    <a
        href={`/api/auth/signout`}
        onClick={(e) => {
            e.preventDefault()
            signOut({
                redirect:false,
            })
                .then(()=>{
                    router.push('/')
                })
                .catch(e => {
                    throw new Error(e)
                })
        }}
    >Logout
    </a>
    )
}
ProtectedPage.auth=true;
