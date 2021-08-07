import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            {Component.auth
                ? <Auth><Component {...pageProps} /></Auth>
                : <Component {...pageProps} />
            }
        </Provider>
    )
}

function Auth({ children }) {
    const [session, loading] = useSession()
    const isUser = !!session?.user
    const router = useRouter()
    useEffect(() => {
        if (loading) return // Do nothing while loading
        if (!isUser) router.push('/join/login')
    }, [isUser, loading])
    if (isUser) {
        return children
    }
    return <div>Loading...</div>
}
export default MyApp

