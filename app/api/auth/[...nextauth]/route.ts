import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

console.log('Auth URL:', process.env.NEXTAUTH_URL)

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: true,
})

export { handler as GET, handler as POST }

export const dynamic = "force-dynamic";
