import {authConfig} from "./pages/functions/nextauth.js";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export {handler as GET, handler as POST};