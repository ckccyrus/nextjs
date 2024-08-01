import NextAuth, { NextAuthConfig } from "next-auth"
import type { Provider } from "next-auth/providers"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const providers: Provider[] = [
    GitHub,
    // Google
];

const config = {
    providers,
    callbacks: {
        jwt({ token, trigger, session, account }) {
            if (trigger === "update") token.name = session.user.name
            return token
        },
        // redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith("/")) return `${baseUrl}${url}`

        //     // Allows callback URLs on the same origin
        //     if (new URL(url).origin === baseUrl) return url

        //     return baseUrl
        // }
    },
    // debug: process.env.NODE_ENV !== "production" ? true : false,
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