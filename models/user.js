var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    /* The user's id | Needed scope: `identify` */
    discord_id: {
        type: String,
        required: 'id is needed!'
    },
    /* The user's username, not unique across the platform | Needed scope: `identify` */
    username: {
        type: String,
        required: "username is needed!"
    },
    /*  The user's 4-digit discord-tag | Needed scope: `identify` */
    discriminator: {
        type: String,
        required: "numbers are needed!"
    },
    /* Whether the email on this account has been verified | Needed scope: `email` */
    verified: {
        type:  Boolean
    },
    /* The user's email | Needed scope: `email`*/
    email: {
        type: String,
    },
});

var User = mongoose.model('users', userSchema);

module.exports = User;