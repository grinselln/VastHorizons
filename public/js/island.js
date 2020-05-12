$(document).ready(function() { 
  $("#new_island").click(function(){
    $(".alert").hide();
    createIsland();
  });

  $("#update_island").click(function(){
      $(".alert").hide();
      updateIsland();
  });


  $("input").change(function(){
    validateFormData(document.getElementById(this.id).value, this.getAttribute("data-validation"));
  });

  $(document).on('change','select',function(){
    validateFormData(document.getElementById(this.id).value, this.getAttribute("data-validation"));
});

  $.getJSON("/api/island")
  .then(getIsland)
});

function getIsland(data){

  if(data.success == 1){
    $("#island_name").val(data.name);
    $("#villager_name").val(data.villager_name);
    $("#native_fruit").val(data.native_fruit);
    $("#island_hemisphere").val(data.hemisphere);
  }
}

function createIsland(){
  const formData = pullFormData(false);

  console.log(formData);

  const updateURL = '/api/island';

  $.ajax({
    method: 'POST',
    url: updateURL,
    data: formData
  })
  .then(function(result){
    if(result.success == 1){
      displaySuccessAlert(result.message);
      $("#island_form").empty();
      var button = "<a href='/' class='btn btn-primary'>Explore the site!</a>";
      $("#island_form").append(button);
    }
    else{
      displayDangerAlert(result.fieldName + ": " + result.message);
    }
  });
}

function updateIsland(){
  const formData = pullFormData(false);

  const updateURL = '/api/island';

  $.ajax({
    method: 'PUT',
    url: updateURL,
    data: formData
  })
  .then(function(result){
    if(result.success == 1){
      displaySuccessAlert(result.message);
      $("form button").prop("disabled",true);
    }
    else{
      displayDangerAlert(result.fieldName + ": " + result.message);
    }
  });
}