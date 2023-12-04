const env = process.env.NODE_ENV || 'dev';
require('dotenv').config();

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: process.env.MONGO_URI,
            jwt: process.env.JWT,
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {
            bd_string: process.env.MONGO_URI
        }

        case 'prod':
        return {
            bd_string: process.env.MONGO_URI
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();