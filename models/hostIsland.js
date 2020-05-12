var mongoose = require('mongoose');

var hostIslandSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: 'discord id is needed!'
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    dodo_code: {
        type: String,
        required: "dodo code is needed!"
    },
    queue_details: {
        max_visitors: {
            type: Number,
            default: 4
        },
        current_visitors: {
            type: Number,
            default: 0
        },
        max_queue: {
            type: Number,
            default: 25
        },
        current_queue: {
            type: Number,
            default: 0
        },
        closed_queue: {
            type: Boolean,
            default: false
        },
        queue_timeout: {
            type: Number,
            default: 5 /*minutes*/
        },
    },
    host_clothes: {
        type: String
    },
    host_wishlist: {
        type: String
    },
    host_category_details: {
        host_category: {
            type: String,
            required: "Category type is needed!"
        },
        diy: {
            villager_name: {
                type: String,
                //required: "villager name is needed!"
            },
            diy_item: {
                type: String,
                //required: "diy name is needed!"
            },
            villager_location: {
                type: String
            },
        },
        unique_visitor: {
            visitor_name: {
                type: String,
                //required: "villager name is needed!"
            },
            visitor_location: {
                type: String
            },
        },
    },
    island_restrictions: {
        pick_flowers: {
            type: Boolean,
            default: false
        },
        shake_trees: {
            type: Boolean,
            default: false
        },
        pick_fruit: {
            type: Boolean,
            default: false
        },
        gather_shells: {
            type: Boolean,
            default: false
        },
        catch_fish: {
            type: Boolean,
            default: false
        },
        catch_bugs: {
            type: Boolean,
            default: false
        },
        bulletin_board_post: {
            type: Boolean,
            default: false
        }
    },
    additional_details: {
        type: String
    }
});

var HostIsland = mongoose.model('hostedislands', hostIslandSchema);

module.exports = HostIsland;