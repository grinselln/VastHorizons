$(document).ready(function() { 

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
  
    $('input[name=hostReason]').on('change', function() {
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
    /*$("#updateIsland").click(function(){
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
    .then(getIsland)*/
  });
