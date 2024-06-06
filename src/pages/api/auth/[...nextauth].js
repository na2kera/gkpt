import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callback: {
    async jwt(token, user, account, profile, isNewUser) {
      if (profile) {
        token.avatar = profile.avatar;
      }
      return token;
    },
    async session(session, token) {
      session.user.avatar = `https://cdn.discordapp.com/avatars/${token.sub}/${token.avatar}.png`;
      return session;
    },
  },
};

export default NextAuth(authOptions);
