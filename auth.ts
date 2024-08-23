import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import "next-auth/jwt"

import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { checkUserExists, createFrappeApiKeys, createFrappeUser } from "actions/register"
import { adminApiClient } from "configs/axios"
import { SIGN_IN, SIGN_UP } from "configs/constants"

const config = {
  pages: {
    signIn: "/auth/sign-in",
  },

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials
        const nextAuthUserRes = await adminApiClient.get(`/document/NextAuthUser/${email}`)
        const { data } = nextAuthUserRes.data
        const passwordsMatch = await bcrypt.compare(password as string, data.hashed_password as string)

        if (passwordsMatch) {
          const userInfoRes = await adminApiClient.get(`/document/User/${email}`)
          const { data: userInfo } = userInfoRes.data
          const api_secret = await createFrappeApiKeys(email as string)
          return {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            roles: userInfo.roles,
            api_key: userInfo.api_key,
            api_secret: api_secret,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    /* Callbacks are asynchronous functions you can use to control what happens when an action is performed.
    Callbacks allow you to implement access controls without a database and to integrate with external databases or APIs. */
    async signIn({ user, account, profile, email, credentials }) {
      /* Use the signIn() callback to control if a user is allowed to sign in. */
      console.log({ user, account, profile, email, credentials })

      if (account?.provider === "google") {
        const gmail = user?.email ?? ""
        const userExists = await checkUserExists(gmail)
        if (!userExists) {
          await createFrappeUser(gmail, user?.name ?? "", "")
          await createFrappeApiKeys(gmail)
        }
        return true
      }

      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      /* The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
     By default, only URLs on the same URL as the site are allowed. You can use the redirect callback to customize that behavior.

     NOTE: The redirect callback may be invoked more than once in the same flow. */

      // Redirect to baseUrl if the target URL is the sign-in or sign-up page
      if ([`${baseUrl}/${SIGN_IN}`, `${baseUrl}/${SIGN_UP}`].includes(url)) {
        return baseUrl
      }

      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }

      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url
      }

      // Default redirect to baseUrl for any other cases
      return baseUrl
    },

    authorized({ request, auth }) {
      // used in between signin and redirect
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },

    async jwt({ token, trigger, session, account, user }) {
      /* jwt callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
      Requests to /api/auth/signin, /api/auth/session and calls to getSession(), getServerSession(), useSession() will invoke this function, but only if you are using a JWT session.      
      This method is not invoked when you persist sessions in a database.
      The returned value will be encrypted, and it is stored in a cookie. */
      console.log({ token, trigger, session, account, user })
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.provider === "google") {
        token.accessToken = account.access_token
        token.userId = account.userId
        const gmail = user?.email ?? ""
        const userInfoRes = await adminApiClient.get(`/document/User/${gmail}`)
        const { data: userInfo } = userInfoRes.data
        const api_secret = await createFrappeApiKeys(gmail)
        token.userInfo = {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          roles: userInfo.roles,
          api_key: userInfo.api_key,
          api_secret: api_secret,
        }
      }

      if (account?.provider === "credentials") {
        // Attach userInfo to the token if it's the initial sign-in
        token.userInfo = user
      }
      return token
    },
    async session({ session, token }) {
      /* The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security. If you want to make something available you added to the token (like access_token and user.id from above) via the jwt() callback, you have to explicitly forward it here to make it available to the client. you will get all the keys from jwt() return and you can filter or add more keys to the session object.

      Invoked after e.g. getSession(), useSession(), /api/auth/session */
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      if (token?.userInfo) {
        session.userInfo = token.userInfo
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
    userInfo?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
