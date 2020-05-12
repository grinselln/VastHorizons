module.exports = {
    validateFormData: function (formObj) {
        var results;
        //run through object and test only needed fields
        for (var key of Object.keys(formObj)) {
            if(formObj[key].validation != "false"){ //this skips checks for radio buttons or other non validated fields
                results = validateField(formObj[key].value, formObj[key].validation);
                
                if(results.success == 0){
                    //let user know which field was the issue
                    results.fieldName = formObj[key].fieldName;
                    break;
                }
            }
            
        }
        return results;
    }
  };

function validateField(fieldValue, checkType) {
    var returnValues = {
        success: 1,
        message: "All fields are valid!"
    }

    var RegExpresion;
    var alertMessage;

    //QUICK BREAKDOWN
    //1: numbers    2: letters  3: numbers/letters  4: numbers/letters/symbols
    //else, move to custom validation functions for very specific needs
    switch(checkType){
        case "1":     //numbers
            break;
        case "1.1":   //numbers or nothing
            RegExpresion = /^([0-9]+)?$/;
            alertMessage = "Please leave blank or only use numbers.";
            break;
        case "1.2":   //numbers/spaces
            break;
        case "1.3":   //numbers/spaces or nothing
            break;
        case "2":     //letters
            break;
        case "2.1":   //letters or nothing
            break;
        case "2.2":   //letters/spaces
            RegExpresion = /^[a-zA-Z ]+$/;
            alertMessage = "Please only use capital letters, lowercase letter, and spaces.";
            break;
        case "2.3":   //letters/spaces or nothing
            break;
        case "3":     //numbers/letters
            break;
        case "3.1":   //numbers/letters or nothing
            break;
        case "3.2":   //numbers/letters/spaces
            break;
        case "3.3":   //numbers/letters/spaces or nothing
            break;
        case "4":     //numbers/letters/symbols
            break;
        case "4.1":   //numbers/letters/symbols or nothing
            break;
        case "4.2":   //numbers/letters/symbols/spaces
            RegExpresion = /^[a-zA-Z0-9 ',.-]+$/;
            alertMessage = "Please only use lowercase letters, capital letters, numbers, spaces and the symbols , . ' - ";
            break;
        case "4.3":   //numbers/letters/symbols/spaces or nothing
            RegExpresion = /^([a-zA-Z0-9 ',.-]+)?$/;
            alertMessage = "Please leave blank or only use lowercase letters, capital letters, numbers, spaces, and the symbols , . ' - ";
            break;
        default:        //specific check is needed
            if(checkType.includes("99")){  //creating an island
                var result = createIslandValidation(checkType);
                RegExpresion = new RegExp(result.RegExpresion);
                alertMessage = result.alertMessage;
            } 
            else if(checkType.includes("100")){  //hosting an island
                var result = hostIslandValidation(checkType);
                RegExpresion = new RegExp(result.RegExpresion);
                alertMessage = result.alertMessage;
            }
                
    }

    if(!RegExpresion.test(fieldValue)){
        returnValues.success = 0;
        returnValues.message = alertMessage;
    }

    return returnValues;
}

function createIslandValidation(checkType){
    var result = {
        RegExpresion: "",
        alertMessage: ""
    }

    //checks for island hosting specific fields
    switch(checkType){
        case "99":     //island + villager names cannot be > 10 characters (foreign characters accepted)
            result.RegExpresion = /^[a-zA-Z\p{L}0-9 ]{1,10}$/;
            result.alertMessage = "Please only use letters and spaces.  The max length is 10.  This field cannot be blank.";
            break;
        case "99.1":   //accept only accepted fruit
            result.RegExpresion = /^apples|cherries|oranges|peaches|pears$/;
            result.alertMessage = "Only Apples, Cherries, Oranges, Peaches, and Pears are accepted fruits.  Island fruit cannot be blank.";
            break;
        case "99.2":   //accept only accepted hemispheres
            result.RegExpresion = /^north|south$/;
            result.alertMessage = "Only North and South are accepted hemispheres.  Hemisphere cannot be blank.";
            break;     
    }

    return result;
}

function hostIslandValidation(checkType){
    var result = {
        RegExpresion: "",
        alertMessage: ""
    }

    //checks for island hosting specific fields
    switch(checkType){
        case "100":     //dodo code
            //dodo codes can only be numbers 1-9
            //capital letters, but not I, O, or Z
            //5 total characters
            result.RegExpresion = /^[A-HJ-NP-Y0-9]{5}$/;
            result.alertMessage = "This is not a valid Dodo Code.";
            break;
        case "100.1":   //max visitors
            result.RegExpresion = /^[1-8]?$/;    //can be blank so default is assigned
            result.alertMessage = "1 - 8 is the range of visitors accepted.";
            break;
        case "100.2":   //max queue
            result.RegExpresion = /^[1-9]?[0-9]?$|^100$/;    //can be blank so default is assigned
            result.alertMessage = "1 - 100 is the queue range that is accepted.";
            break;     
    }

    return result;
}