const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;// module which helps us extract JWT from header

const User = require('../models/user');


let opts = {// options
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),// see documentaion
    secretOrKey: 'codeial'// excrption and descption key
}

// HEADER | PAYLOAD | SIGNATURE 
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){// notice call back gets the payload 

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);// WE FOUND USER AND PUT IT IN THE REQUEST
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;
