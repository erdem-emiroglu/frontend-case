"use client";

import {ApolloLink, HttpLink} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import {Character, Characters, GetCharactersQueryResult} from "@/graphql/generated";

function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
        fetchOptions: {cache: "no-store"},
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        characters: {
                            keyArgs: ["filter"],
                            merge(existing: Characters, incoming: Characters) {
                                return {
                                    ...incoming,
                                    results: [
                                        ...(existing?.results || []),
                                        ...(incoming?.results || []),
                                    ],
                                } satisfies Characters;
                            },
                        },
                    },
                },
            },
        }),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    httpLink,
                ])
                : httpLink,
    });
}

export function ApolloWrapper({children}: { children: React.ReactNode }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
