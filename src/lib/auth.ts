import { SvelteKitAuth } from "@auth/sveltekit";
import BattleNet from "@auth/sveltekit/providers/battlenet";
import {
  AUTH_BATTLENET_CLIENT_ID,
  AUTH_BATTLENET_CLIENT_SECRET,
  AUTH_TRUST_HOST,
} from "$env/static/private";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "$src/database/prismaClient.server";

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: !!AUTH_TRUST_HOST,
  providers: [
    BattleNet({
      clientId: AUTH_BATTLENET_CLIENT_ID,
      clientSecret: AUTH_BATTLENET_CLIENT_SECRET,
      issuer: "https://oauth.battle.net",
      checks: ["nonce"],
      authorization: {
        params: {
          // Battle.net requires a `state` param to be present. No clue what it does, but auth.js doesn't provide it by default
          state: "none",
        },
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session }) {
      return session;
    },
  },
});
