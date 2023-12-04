const express = require("express");
const app = express();

const indexRoute = require("./routes/index");
const userRoute = require("./routes/users");

app.use('/', indexRoute);
app.use('/users', userRoute);

app.listen(3000);

module.exports = app;