var db = require('../../models');

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

    if(validationResult.success == 0){
        res.status(200).json(validationResult);
    }else{
        const newIslandData = {
            discord_id: req.session.userID,
            name: req.body.islandName,
            villager_name: req.body.villagerName,
            native_fruit: req.body.nativeFruit,
            hemisphere: req.body.islandHemisphere
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
    var result;
    var validationResult = validateIslandData(req, res);
    if(validationResult.success == 0){
        res.status(200).json(validationResult);
    }else{
        const userChangedIslandData = {
            discord_id: req.session.userID,
            name: req.body.islandName,
            villager_name: req.body.villagerName,
            native_fruit: req.body.nativeFruit,
            hemisphere: req.body.islandHemisphere
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

  function validateIslandData(req, res){
    const acceptedFruits = ["apples", "cherries", "oranges", "peaches", "pears"];
    const acceptedHemispheres = ["north", "south"];
    var result;

    if(req.body.islandName.length > 10 || req.body.villagerName > 10){
        result = {
            success: 0,
            message: "Island and Villager names cannot be greater than 10 characters. Island was not updated."
        };
    }
    else if(req.body.islandName.length == 0 || req.body.villagerName == 0){
        result = {
            success: 0,
            message: "Island and Villager names cannot be blank. Island was not updated."
        };
    }
    else if(!acceptedFruits.includes(req.body.nativeFruit)){
        result = {
            success: 0,
            message: "Only Apples, Cherries, Oranges, Peaches, and Pears are accepted fruits.  Island fruit cannot be blank. Island was not updated."
        };
    }
    else if(!acceptedHemispheres.includes(req.body.islandHemisphere)){
        result = {
            success: 0,
            message: "Only North and South are accepted hemispheres.  Hemisphere cannot be blank. Island was not updated."
        };
    }
    else{
        result = {
            success: 1
        }
    }

    return result;
  }

  module.exports = exports;