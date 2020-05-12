var db = require('../models'); 
var validation = require("../functions/fieldValidation");

exports.createHostIsland = function(req, res){
  const validationResult = validation.validateFormData(req.body);
  if(validationResult.success == 0){
    res.status(200).json(validationResult);
  }else{
      const newHostIslandData = loadFormData(req, req.body);
      console.log(newHostIslandData);

      db.HostIsland.create(newHostIslandData)
      .then(function(newHostIsland){
        result = {
          success: 1,
          redirect: "/hostIslandSuccess" 
        };
        res.status(200).json(result);
      })
      .catch(function(err){
          result = {
              success: 0,
              message: "Your island was unable to be hosted." 
          };
          res.status(200).json(result);
      })
  }
}

//take form data and place in into an object to prepare for db interaction
function loadFormData(req, formData){
  var returnObj = {queue_details: {}, host_category_details: {}, island_restrictions: {}};

  //set non form related data
  returnObj.discord_id = req.session.userID;

  for (var key of Object.keys(formData)) {
    if(formData[key].value != ""){

      switch(formData[key].fieldName){
        /*** ISLAND BASICS ***/
        case "Dodo Code":
          returnObj.dodo_code = formData[key].value;
          break;
        case "Villager Clothes":
          returnObj.host_clothes = formData[key].value;
          break;
        case "Max Visitors":
          returnObj.queue_details.max_visitors = parseInt(formData[key].value);
          break;
        case "Max Queue":
          returnObj.queue_details.max_queue = parseInt(formData[key].value);
          break;
        case "Queue Timeout":
          returnObj["queue_details"].queue_timeout = parseInt(formData[key].value);
          break;
        case "Host Reason":
          returnObj["host_category_details"].host_category = formData[key].value;

          //initialize appropriate nested objects
          if(formData[key].value == "diy"){
            returnObj["host_category_details"].diy = {};
          }
          else if(formData[key].value == "uniqueVisitor"){
            returnObj["host_category_details"].unique_visitor = {};
          }
        break;
        /*** DIY ***/
        case "Diy Villager Name":
          returnObj["host_category_details"].diy.villager_name = formData[key].value;
          break;
        case "Diy Item":
          returnObj.host_category_details.diy.diy_item = formData[key].value;
          break;
        case "Diy Villager Location":
          returnObj.host_category_details.diy.villager_location = formData[key].value;
          break;
        /*** UNIQUE VISITOR ***/
        case "Unique Visitor":
          returnObj.host_category_details.unique_visitor.visitor_name = formData[key].value;
          break;
        case "Unique Visitor Location":
          returnObj.host_category_details.unique_visitor.visitor_location = formData[key].value;
          break;
        /*** RESTRICTIONS ***/
        case "Restriction Flowers":
          returnObj.island_restrictions.pick_flowers = (formData[key].value == "true");
          break;
        case "Restriction Fruit":
          returnObj.island_restrictions.pick_fruit = (formData[key].value == "true");
          break;
        case "Restriction Trees":
          returnObj.island_restrictions.shake_trees = (formData[key].value == "true");
          break;
        case "Restriction Shells":
          returnObj.island_restrictions.gather_shells = (formData[key].value == "true");
          break;
        case "Restriction Fish":
          returnObj.island_restrictions.catch_fish = (formData[key].value == "true");
          break;
        case "Restriction Bugs":
          returnObj.island_restrictions.catch_bugs = (formData[key].value == "true");
          break;
        case "Restriction Bulletin Board":
          returnObj.island_restrictions.bulletin_board_post = (formData[key].value == "true");
          break;
        /*** WRAP UP ***/
        case "Wishlist":
          returnObj.host_wishlist = formData[key].value;
          break;
        case "Additional Details":
          returnObj.additional_details = formData[key].value;
          break;
      }
    } 
  }
  return returnObj;
}