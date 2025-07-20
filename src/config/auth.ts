import { ExpressAuthConfig } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";
import prisma from "../config/prisma";
import { validatePassword } from "../utils/hash";

export const authConfig: ExpressAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const email = creds.email;
        const password = creds.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user?.passwordHash) {
          const isValid = await validatePassword(password, user.passwordHash);
          if (isValid) {
            return { id: user.id, email: user.email! };
          }
        }

        return null;
      },
    }),
  ],
  trustHost: true,
};
