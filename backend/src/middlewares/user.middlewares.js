const jwt = require('jsonwebtoken')
require('dotenv').config()



function checkToken (req, res, next) {
  const authHeader = req.get('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({ message: 'Acesso Negado' })
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    }catch(error){
        return res.status(401).send({ message: 'Token inválido' })
    }
}

module.exports = checkToken