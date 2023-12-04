const express = require("express");
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT, { expiresIn: '7d' });
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.json(users);
    } catch (err) {
        return res.json({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.json({ error: 'Dados insuficientes! '});

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.json({ error: 'Usuário já registrado! '});
        }

        const newUser = await Users.create(req.body);
        newUser.password = undefined;
        return res.json({ user: newUser, token: createUserToken(newUser.id) });
    } catch (err) {
        return res.json({ error: 'Erro ao criar usuário!'});
    }
});

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ error: 'Dados insuficientes!' });
        }

        const user = await Users.findOne({ email }).select('+password');

        if (!user) {
            return res.json({ error: 'Usuário não registrado!' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json({ error: 'Erro ao autenticar usuário!' });
        }

        user.password = undefined;

        return res.json({ user, token: createUserToken(user.id) });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

module.exports = router;
