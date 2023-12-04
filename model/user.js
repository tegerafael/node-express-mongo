const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if(!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);