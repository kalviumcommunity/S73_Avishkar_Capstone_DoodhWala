import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Configure Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true, // This allows us to access the request object in the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        // Check if we have a valid email
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("No email found in Google profile"), null);
        }

        const email = profile.emails[0].value;

        // Get query parameters from the request
        const { action, role, contactNo } = req.query;

        // Check if user already exists in our database
        const user = await User.findOne({ email });

        if (user) {
          // User exists

          // If this is a signup attempt but user already exists, return specific error
          if (action === "signup") {
            return done(new Error("USER_ALREADY_EXISTS"), null);
          }

          // For login, update Google ID if not already set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          console.log("Existing user found:", user);
          return done(null, user);
        } else {
          // This is a new user

          // If this is a login attempt and user doesn't exist, return error
          if (action === "login") {
            return done(new Error("USER_NOT_FOUND"), null);
          }

          // For signup, we need role and contact number
          if (!role || !contactNo) {
            return done(new Error("MISSING_SIGNUP_INFO"), null);
          }

          // Create a new user with Google profile data
          const newUser = await User.create({
            name: profile.displayName,
            email: email,
            // Generate a random password for Google users
            password:
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8),
            role: role,
            contactNo: contactNo,
            googleId: profile.id,
          });

          console.log("New user created:", newUser);
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error in Google strategy:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;
