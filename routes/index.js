const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    res.send({ message: 'Essa informação é muito importante. Usuários não autorizados não deveriam recebê-lá!'} )
});

router.post('/', (req, res) => {
    res.send({ message: 'Tudo OK com o método POST da raiz!'} )
});

module.exports = router;