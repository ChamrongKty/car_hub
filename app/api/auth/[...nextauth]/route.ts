import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import  CredentialsProvider from "next-auth/providers/credentials";

const authOptions:NextAuthOptions= {
    session:{
        strategy:'jwt'
    },
    providers:[
        CredentialsProvider({
            type:"credentials",
            credentials:{},
            authorize(credentials,req){
                const {email,password} = credentials as {email:string,password:string};

                if(email !== 'chamrongkty@gmail.com' || password !== "12345"){
                    throw new Error("Invalid credentials.")
                }

                return {id:'1232',name:"Jonh Doe"}
            },
            
        })
    ],
    pages:{
        signIn:"/auth/sign-in"
    },
    secret:process.env.NEXTAUTH_SECRET
}
const handler = NextAuth(
    authOptions
)
export { handler as GET, handler as POST }