import NextAuth, { NextAuthConfig } from "next-auth"
import type { Provider } from "next-auth/providers"

import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const providers: Provider[] = [
    // Credentials({
    //     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //     // e.g. domain, username, password, 2FA token, etc.
    //     credentials: {
    //         email: {},
    //         password: {},
    //     },
    //     authorize: async (credentials) => {
    //         let user = null;


    //         return user
    //     }
    // }),
    GitHub,
    Google
];

const config = {
    providers,
    callbacks: {
        jwt({ token, trigger, session, account }) {
            if (trigger === "update") token.name = session.user.name
            // if (account?.provider === "keycloak") {
            //     return { ...token, accessToken: account.access_token }
            // }
            return token
        },
    },
    pages: {
        signIn: "/auth/signin"
    },
    debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})

export const { handlers, signIn, signOut, auth } = NextAuth(config)