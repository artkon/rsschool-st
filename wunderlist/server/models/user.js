const mongoose = require('../config/mongoose-setup');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const crypto = require('crypto');
const config = require('../config');

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    hashedPassword: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubUserName: String
})

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = config.get('dbSalt');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    })

schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

schema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports.User = mongoose.model('User', schema);
