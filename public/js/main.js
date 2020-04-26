$(document).ready(function() {
    $('.alert .close').on('click', function(e) {
        $(this).parent().hide();
    });
});

function displaySuccessAlert(message){
    $(".alert").removeClass('alert-warning');
    $(".alert").removeClass('alert-danger');

    $(".alert").addClass('alert-success');

    $("#alertMessage").text(message);
    $(".alert").show();
}

function displayWarningAlert(message){
    $(".alert").removeClass('alert-danger');
    $(".alert").removeClass('alert-success');

    $(".alert").addClass('alert-warning');
    
    $("#alertMessage").text(message);
    $(".alert").show();
}

function displayDangerAlert(message){
    $(".alert").removeClass('alert-warning');
    $(".alert").removeClass('alert-success');

    $(".alert").addClass('alert-danger');
    
    $("#alertMessage").text(message);
    $(".alert").show();
}