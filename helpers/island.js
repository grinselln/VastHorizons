var db = require('../models');
var validation = require("../functions/fieldValidation");

exports.getIsland = function(req, res){
    if(req.session.hasIsland == 1){
        db.Island.find({"discord_id": req.session.userID})
        .then(function(foundIsland){

            const islandData = {
                success: 1,
                name: foundIsland[0].name,
                villager_name: foundIsland[0].villager_name,
                native_fruit: foundIsland[0].native_fruit,
                hemisphere: foundIsland[0].hemisphere
            }

            res.status(200).json(islandData);
        })
        .catch(function(err){
            const islanData = {
                success: 0,
                error: "We could not find your island data."
            }

            res.status(404).json(islandData);
        })
    }
}

exports.createIsland = function(req, res){
    var result;
    var validationResult = validateIslandData(req, res);
    console.log(req.body);
    if(validationResult.success == 0){
        res.status(200).json(validationResult);
    }else{
        const newIslandData = {
            discord_id: req.session.userID,
            name: req.body[0].value,
            villager_name: req.body[1].value,
            native_fruit: req.body[2].value,
            hemisphere: req.body[3].value
        }
    
        db.Island.create(newIslandData)
        .then(function(newIsland){
            req.session.hasIsland = 1;
            result = {
                success: 1,
                message: "Your island has been successfully been created!"
            };
            res.status(200).json(result);
        })
        .catch(function(err){
            result = {
                success: 0,
                message: "Your island was unable to be created." 
            };
            res.status(200).json(result);
        })
    }
}

exports.updateIsland = function(req, res){
    var validationResult = validation.validateFormData(req.body);

    if(validationResult.success == 0){
        res.status(200).json(validationResult);
    }else{
        const userChangedIslandData = {
            discord_id: req.session.userID,
            name: req.body[0].value,
            villager_name: req.body[1].value,
            native_fruit: req.body[2].value,
            hemisphere: req.body[3].value
        }
        
        db.Island.findOneAndUpdate({discord_id: req.session.userID}, userChangedIslandData, {new: true})
        .then(function(updatedIsland){
            result = {
                success: 1,
                message: "Your island has been successfully updated!"
            };
            res.status(200).json(result);
        })
        .catch(function(err){
            result = {
                success: 0,
                message: "Your island could not be found to be updated." 
            };
            res.status(200).json(result);
        }) 
    }
}

  module.exports = exports;