const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('./config/config');

const uri = config.bd_string;

mongoose.connect(uri);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', (err) => {
    console.log('Aplicação desconectada do banco de dados: ' + err);
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require("./routes/index");
const userRoute = require("./routes/users");

app.use('/', indexRoute);
app.use('/users', userRoute);

app.listen(3000);

module.exports = app;