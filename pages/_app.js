import 'tailwindcss/tailwind.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps.initialApolloState)

    return (
        <ApolloProvider client={apolloClient}>
            <Provider session={pageProps.session}>
                <ChakraProvider>
                    {Component.auth
                        ? <Auth><Component {...pageProps} /></Auth>
                        : <Component {...pageProps} />
                    }
                </ChakraProvider>
            </Provider>
        </ApolloProvider>
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

