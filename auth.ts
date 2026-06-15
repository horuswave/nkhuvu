import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
          include: { eventAdmins: { include: { event: true } } },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );
        if (!valid) return null;

        // Super-admin: no event scope
        if (user.isSuperAdmin) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isSuperAdmin: true,
            eventId: null,
          };
        }

        // Event admin: might not have an event assigned yet (new subscription users)
        const firstAssignment = user.eventAdmins[0];

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isSuperAdmin: false,
          eventId: firstAssignment?.eventId || null,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Refresh event assignment on every sign-in to handle newly created events
      if (user && !user.isSuperAdmin) {
        const adminUser = await prisma.adminUser.findUnique({
          where: { id: user.id },
          include: { eventAdmins: { include: { event: true } } },
        });
        if (adminUser) {
          const firstAssignment = adminUser.eventAdmins[0];
          (user as any).eventId = firstAssignment?.eventId || null;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.isSuperAdmin = (user as any).isSuperAdmin;
        token.eventId = (user as any).eventId ?? null;
      }

      if (trigger === "update" && token.id && !token.isSuperAdmin) {
        const adminUser = await prisma.adminUser.findUnique({
          where: { id: token.id as string },
          include: { eventAdmins: true },
        });
        if (adminUser) {
          token.eventId = adminUser.eventAdmins[0]?.eventId ?? null;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.isSuperAdmin = token.isSuperAdmin as boolean;
      session.user.eventId = token.eventId as string | null;
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
});
