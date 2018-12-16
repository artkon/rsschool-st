const mongoose = require('../config/mongoose-setup');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const schema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
    },
    salt: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    githubId: {
        type: String,
        unique: true
    },
    githubUserName: String
})

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    })

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

module.exports.User = mongoose.model('User', schema);
