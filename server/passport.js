const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorize'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ email })

        // If not handle it
        if (!user) {
            return done(null, false);
        }

        // Check if password is correct
        const isMatch = await user.isValidPassword(password);

        // If not handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otheriwse, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));