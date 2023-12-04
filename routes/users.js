const express = require("express");
const router = express.Router();
const Users = require('../model/user');

router.get('/', async (req, res) => {
    try {
        const data = await Users.find({});
        return res.send(data);
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

module.exports = router;
