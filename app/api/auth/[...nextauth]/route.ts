import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                try {

                    const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    })

                    if (!authResponse.ok) {
                        return null
                    }


                    const user = await authResponse.json()
                    console.log(user)

                    return user
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60   //1h
    },

    //custom login page
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };