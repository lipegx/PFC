const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();
jwt = require('jsonwebtoken');


const create = async (req, res) => {
    const { name, username, email, password, confirmPassword} = req.body;

    if (!name || !username || !email || !password || !confirmPassword) {
        res.status(400).send({ message: 'Preencha todos os campos' });
        return;
    }

    if (password !== confirmPassword) {
        res.status(422).send({ message: 'Senhas não conferem' });
        return;
    }

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.status(409).send({ message: 'Email já cadastrado' });
        return;
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

        res.status(201).send({
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
    const { username, password, name } = req.body;

    if (!username) {
        res.status(400).send({ message: 'O nome de usuário é obrigatório' });
        return;
    }
    if (!password) {
        res.status(400).send({ message: 'A senha é obrigatória' });
        return;
    }   

    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(404).send({ message: 'Usuário não encontrado' });
        return;
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
        res.status(401).send({ message: 'Senha incorreta' });
        return;
    }
    try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
             id: user._id }, 
             secret,)
             res.status(200).send({ message: 'Login realizado com sucesso', token: token, name: name});
    }catch(error){
        console.log("Erro ao gerar token", error);
        return res.status(500).send({ message: 'Erro no servidor, tente novamente mais tarde' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).send({ message: 'Usuário não encontrado' });
            return;
        }

        res.status(200).send({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor ao excluir usuário' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        res.status(400).send({ message: 'Todos os campos são obrigatórios para atualização' });
        return;
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
            res.status(404).send({ message: 'Usuário não encontrado' });
            return;
        }

        res.status(200).send({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor ao atualizar usuário' });
    }
};
const listUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users.map(user => ({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        })));
    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor ao buscar usuários' });
    }
};

module.exports = { create, loginUser, deleteUser, update, listUsers};