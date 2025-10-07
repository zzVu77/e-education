// src/config/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env.ENV === "development"
          ? "http://localhost:8080/api/auth/google/callback"
          : process.env.CALLBACK_URL,
    },
    (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const fullName = profile.displayName;
        const googleId = profile.id;

        if (!email) {
          return done(new Error("Email not found in Google profile"), false);
        }

        const user = { email, fullName, googleId };
        return done(null, user);
      } catch (err) {
        return done(err as Error, false);
      }
    },
  ),
);

export default passport;
