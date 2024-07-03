const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    const { name, username, email, password, confirmPassword } = req.body;

    if (!name || !username || !email || !password || !confirmPassword) {
        return res.status(400).send({ message: 'Preencha todos os campos' });
    }

    if (password !== confirmPassword) {
        return res.status(422).send({ message: 'Senhas não conferem' });
    }

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        return res.status(409).send({ message: 'Email já cadastrado' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    try {
        const user = await userService.create({
            name,
            username,
            email,
            password: passwordHash
        });

        if (!user) {
            return res.status(400).send({ message: 'Erro ao criar usuário' });
        }

        return res.status(201).send({
            message: 'Usuário criado com sucesso',
            user: {
                id: user._id,
                name,
                username,
                email
            }
        });
    } catch (error) {
        return res.status(500).send({ message: 'Erro no servidor, tente novamente mais tarde' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Nome de usuário e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(401).send({ message: 'Senha incorreta' });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        return res.status(200).send({
            message: 'Login realizado com sucesso',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Erro ao gerar token", error);
        return res.status(500).send({ message: 'Erro no servidor, tente novamente mais tarde' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        return res.status(200).send({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        return res.status(500).send({ message: 'Erro no servidor ao excluir usuário' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios para atualização' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            username,
            email,
            password: passwordHash
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        return res.status(200).send({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email
            }
        });
    } catch (error) {
        return res.status(500).send({ message: 'Erro no servidor ao atualizar usuário' });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        return res.status(200).send(users.map(user => ({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        })));
    } catch (error) {
        return res.status(500).send({ message: 'Erro no servidor ao buscar usuários' });
    }
};


const updateUserPhoto = async (req, res) => {
    try {
      const userId = req.user.id; // Obtenha o ID do usuário do token
      const { photo } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photo },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      console.log('User updated with new photo URL:', updatedUser.photo); // Adicione este log
  
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send({ message: 'Server error', error });
    }
  };
  
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, '-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = { create, loginUser, deleteUser, update, listUsers, getUserById, updateUserPhoto};