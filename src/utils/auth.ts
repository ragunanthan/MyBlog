import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { AdapterUser } from "next-auth/adapters";
import  { AuthOptions } from "next-auth";

interface CredentialsAuthorizeParams {
    email: string;
    password: string;
  }

  
export  const authOptions:AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(
          credentials: CredentialsAuthorizeParams | undefined
        ): Promise<AuthUser  | null>  {
          try {
            const user = await User.findOne({ email: credentials?.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials?.password ?? "",
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err) {
            throw new Error("Error in login");
          }
          return null;
        },
      }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID ?? "",
      //   clientSecret: process.env.GITHUB_SECRET ?? "",
      // }),
    ],
    callbacks: {
      signIn: async ({
        user,
        account,
      }: {
        user: AuthUser | AdapterUser;
        account: Account | null;
      }): Promise<boolean> => {
        if (account?.provider == "credentials") {
          return true;
        }
        if (account?.provider == "github") {
          try {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
              const newUser = new User({
                email: user.email,
              });
  
              await newUser.save();
              return true;
            }
            return true;
          } catch (err) {
            console.log("Error saving user", err);
            return false;
          }
        }
        return false;
      },
      
    },
  };