const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    //Get the token from request
    const token = req.cookies.jwtAuth;
    
    //Check jwt
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET, (err, decodedToken) =>{
            if(err){
                //The token is not good
                //console.log('The token is not good');
                return res.status(400).json({isAuth: false, type: ''});
            }else{
                //User authenticated
                //console.log('before next');
                next();
            }
        } );
    }else{
        //Token doesn't exist
        return res.status(400).json({isAuth: false, type: ''});
    }
}

//export requireAuth function
module.exports = {requireAuth};