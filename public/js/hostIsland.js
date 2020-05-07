$(document).ready(function() { 

    //button actions to navigate form
    $(".hostIsland_toStep1").click(function(){
        $(".hostIslandSteps").hide();
        $("#hostIsland_step1").show();
    });
    
    $(".hostIsland_toStep2").click(function(){
        $(".hostIslandSteps").hide();
        $("#hostIsland_step2").show();
    });

    $(".hostIsland_toStep3").click(function(){
        $(".hostIslandSteps").hide();
        $("#hostIsland_step3").show();
    });

    $(".hostIsland_toStep4").click(function(){
        $(".hostIslandSteps").hide();
        $("#hostIsland_step4").show();
    });
  
    //clear reason sections if a different reason is chosen
    $('input[name=host_reason]').on('change', function() {
        var hostReason = this.value;

        if(hostReason == "diy"){
            $(".hostOptionDetails").hide();

            //clear out visitor data
            $("#hostReasonUniqueVisitor input[type=radio]").prop('checked', false);
            $("#hostReasonUniqueVisitor input[type=text]").val("");

            $("#hostReasonVillagerDiy").show();
        }
        else if(hostReason == "uniqueVisitor"){
            $(".hostOptionDetails").hide();

            //clear other diy data
            $("#hostReasonVillagerDiy input[type=text]").val("");

            $("#hostReasonUniqueVisitor").show();
        }
     });

     $("input").change(function(){
         if(this.getAttribute("data-validation")){
            validateFormData(document.getElementById(this.id).value, this.getAttribute("data-validation"));
         }
    });

    $("#createHostIsland").click(function(){
        $(".alert").hide();
        createHostIsland();
    });
  });

  function createHostIsland(){
    //don't include non selected host reason fields in data pull
    const hostReason = findRadioButtonValue("host_reason");
    var ignoredFields = [];

    if(hostReason == "diy"){
        ignoredFields.push("#hostReasonUniqueVisitor input");
    }
    else if(hostReason == "uniqueVisitor"){
        ignoredFields.push("#hostReasonVillagerDiy input");
    }
    
    const formData = pullFormData(ignoredFields);
    console.log(formData);
    
      const updateURL = '/api/hostIsland';
      
      /*$.ajax({
        method: 'POST',
        url: updateURL,
        data: hostIslandData
      })
      .then(function(result){
        if(result.success == 1){
          displaySuccessAlert(result.message);
          $("form button").prop("disabled",true);
          $(".hostIslandSteps").hide();
          //let them click to view island
        }
        else{
          displayDangerAlert(result.message);
        }
      });*/
  }
