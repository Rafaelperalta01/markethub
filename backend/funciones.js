



const verifyToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token==null){
        return res.send('Token requerido');
    }
    jwt.verify(token, 'clav3s3cr3ta', (err, user)=>{
        if(err){
            res.send('token invalido');
        } 
        console.log(user);
        req.user = user;
        next();
    });
}


module.exports = {
    verifyToken
}




