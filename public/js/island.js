$(document).ready(function() { 
  $("#newIsland").click(function(){
    $(".alert").hide();
    createIsland();
  });

  $("#updateIsland").click(function(){
      $(".alert").hide();
      updateIsland();
  });


  $("input").change(function(){
    validateIslandData(this);
  });

  $(document).on('change','select',function(){
    validateIslandData(this);
});

  $.getJSON("/api/island")
  .then(getIsland)
});

function getIsland(data){
  if(data.success == 1){
    $("#islandName").val(data.name);
    $("#villagerName").val(data.villager_name);
    $("#nativeFruit").val(data.native_fruit);
    $("#islandHemisphere").val(data.hemisphere);
  }
}

function createIsland(){
  const islandCreate = {
    islandName: $("#islandName").val(),
    villagerName: $("#villagerName").val(),
    nativeFruit: $("#nativeFruit").val(),
    islandHemisphere: $("#islandHemisphere").val()
  }

  const updateURL = '/api/island';

  $.ajax({
    method: 'POST',
    url: updateURL,
    data: islandCreate
  })
  .then(function(result){
    if(result.success == 1){
      displaySuccessAlert(result.message);
      $("#islandForm").empty();
      var button = "<a href='/' class='btn btn-primary'>Explore the site!</a>";
      $("#islandForm").append(button);
    }
    else{
      displayDangerAlert(result.message);
    }
  });
}

function updateIsland(){
  const islandUpdate = {
    islandName: $("#islandName").val(),
    villagerName: $("#villagerName").val(),
    nativeFruit: $("#nativeFruit").val(),
    islandHemisphere: $("#islandHemisphere").val()
  }

  const updateURL = '/api/island';

  $.ajax({
    method: 'PUT',
    url: updateURL,
    data: islandUpdate
  })
  .then(function(result){
    if(result.success == 1){
      displaySuccessAlert(result.message);
      $("form button").prop("disabled",true);
    }
    else{
      displayDangerAlert(result.message);
    }
  });
}

function validateIslandData(inputField){
  console.log("changed");
  const inputFieldID = inputField.id;
  const inputFieldValue = document.getElementById(inputFieldID).value;
  console.log(inputFieldValue);
  const acceptedFruits = ["apples", "cherries", "oranges", "peaches", "pears"];
  const acceptedHemispheres = ["north", "south"];
  var errorMessage;

  if(inputFieldID == "islandName" || inputFieldID == "villagerName"){
    if(inputFieldValue.length > 10){
      errorMessage = "Island and Villager names cannot be greater than 10 characters."
    }
    else if(inputFieldValue.length == 0){
      errorMessage = "Island and Villager names cannot be blank."
    }
  }
  else if(inputFieldID == "nativeFruit"){
    if(!acceptedFruits.includes(inputFieldValue)){
      errorMessage = "Only Apples, Cherries, Oranges, Peaches, and Pears are accepted fruits.  Island fruit cannot be blank."
    }
  }
  else if(inputFieldID == "islandHemisphere"){
    if(!acceptedHemispheres.includes(inputFieldValue)){
      errorMessage = "Only North and South are accepted hemispheres.  Hemisphere cannot be blank."
    }
  }

  if(errorMessage){
    displayWarningAlert(errorMessage);
    $("form button").prop("disabled",true);
  }
  else{
    $(".alert-warning").hide();
    $("form button").prop("disabled",false);
  }
}