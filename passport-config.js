const { authenticate } = require('passport');

const LocalStrategy = require('passport-local').Strategy;


function initialize(passport){

     const authenticateUser = (username, password, done) =>{

        const user = getUserByUsername(username);

        if(user == null){
            return done(null, false, {messae: 'No user with that email'});  
        }


     };


    //passport.use(new LocalStrategy ({usernameField : 'username'}))
    passport.use(new LocalStrategy (), authenticateUser );

    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});

}