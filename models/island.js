var mongoose = require('mongoose');

var islandSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: 'discord id is needed!'
    },
    name: {
        type: String,
        required: 'island name is needed!'
    },
    villager_name: {
        type: String,
        required: "villager name is needed!"
    },
    native_fruit: {
        type: String,
        required: "fruit type is needed!"
    },
    hemisphere: {
        type: String,
        required: "hemisphere is needed!"
    },
});

var Island = mongoose.model('islands', islandSchema);

module.exports = Island;