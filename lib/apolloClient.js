import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        }),
        cache: new InMemoryCache(),
    });
}

export default createApolloClient;
