const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Acesso negado' });
  }

  try {
    const secret = process.env.SECRET;
    const verified = jwt.verify(token, secret);
    req.user = verified; // Defina `req.user` com os dados do token verificado
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Token inválido' });
  }
}

module.exports = checkToken;