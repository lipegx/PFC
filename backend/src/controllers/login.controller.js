const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const users = [];

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
  res.json({ token });
};