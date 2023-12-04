const express = require("express");
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.send({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.send({ error: 'Dados insuficientes! '});

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.send({ error: 'Usuário já registrado! '});
        }

        const newUser = await Users.create(req.body);
        newUser.password = undefined;
        return res.send(newUser);
    } catch (err) {
        return res.send({ error: 'Erro ao criar usuário!'});
    }
});

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send('Dados insuficientes!');
        }

        const user = await Users.findOne({ email }).select('+password');

        if (!user) {
            return res.send('Usuário não registrado!');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.send('Erro ao autenticar usuário!');
        }

        user.password = undefined;

        return res.send(user);
    } catch (error) {
        res.send({ error: error.message });
    }
});
module.exports = router;
