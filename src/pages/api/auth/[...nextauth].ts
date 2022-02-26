import axios from "axios";
import NextAuth from "next-auth";
import ZoomProvider from "next-auth/providers/zoom";

const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, NEXTAUTH_URL } = process.env;

export default NextAuth({
  providers: [
    ZoomProvider({
      clientId: ZOOM_CLIENT_ID!,
      clientSecret: ZOOM_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: ["meeting:read", "meeting:write"].join(" "),
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }

      return token;
    },
    async signIn({ user }) {
      const { status } = await axios.post(
        `${NEXTAUTH_URL}/api/user/update-info`,
        {
          ...user,
        }
      );

      return status == 200;
    },
  },
});
