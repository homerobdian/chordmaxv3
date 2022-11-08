import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/UserModel.js";
import database from "../../../database/database.js";
import argon2 from "argon2";

export const authOptions = {
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.refresh_token;
        token.userRole = "admin";
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        database();
        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user) {
            return null;
          }
          const match = await argon2.verify(
            user.password,
            credentials.password
          );
          if (!match) {
            return null;
          }
          return {
            name: user.name,
            email: user.email,
            role: "user",
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
