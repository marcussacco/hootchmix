$(document).ready(function() {
  $(function() {
      FastClick.attach(document.body);
  });

  var aTot = 0; //booze total volume
  var pTot = 0; //alcohol total percentage
  var mTot = 0; //mixer total volume
  var percentArray = [];
  var newArray = [];
  var aSum = 0;
  //default to oz
  $("#boozeOz,#mixerOz").addClass("unitSelected");


  //change units for the booze...
  $("#boozeUnitBox > .unit").click(function(){
    $("#boozeOz,#boozeMl").toggleClass("unitSelected");
    $(".boozeItem > .unitTail").toggle();
  });

  //change units for the mixer...
  $("#mixerUnitBox > .unit").click(function(){
    $("#mixerOz,#mixerMl").toggleClass("unitSelected");
    $(".mixerItem > .unitTail").toggle();
  });

  //Determine all alcohol variables (total volume, total percentage)
  function findAlcoholVol(){
    //build array of alcohol volumes
    var aArr = document.getElementsByName('aAmount');
    //build array of matching percentages
    var aPerForms = document.getElementsByName('percent');
    //turn percentages into decimals
    for(var x=0;x<aPerForms.length;x++){
      percentArray[x] = aPerForms[x].value * .01;
    }
    
    //find sum of alcohol volumes array
    for(var i=0;i<aArr.length;i++){
      if(parseInt(aArr[i].value))
        aTot += parseInt(aArr[i].value);
    }
    
    //multiply the matching numbers from alc Vol to alc Per
    for(var l=0;l<aArr.length;l++){
      newArray[l] = aArr[l].value * percentArray[l];
      pTot += aArr[l].value * percentArray[l];
    }

    //take our newArray from above, and find the sum of the #'s within it.
    aSum = eval(newArray.join('+'));
  }

  //Determine mixer variables
  function findMixerVol(){
    var mArr = document.getElementsByName('mAmount');
    for(var n=0;n<mArr.length;n++){
      if(parseInt(mArr[n].value))
        mTot += parseInt(mArr[n].value);
    }
  }

  $("button[name = 'mixBtn']").click(function(){
    findAlcoholVol();
    findMixerVol();
    //check if we need to convert ml to oz
    if($("#boozeUnitBox > #boozeMl").hasClass("unitSelected")){
      aTot /= 29.5735;
      aSum/= 29.5735;
    }
    
    if($("#mixerUnitBox > #mixerMl").hasClass("unitSelected")){
      mTot /= 29.5735;
    }
    
    var totalVolume = aTot + mTot;
    //calculate total alcohol content
    var endPercent = aSum / totalVolume;
    //format answer and output to screen
    if (isNaN(endPercent)){
      $("#output").text("Please enter numbers only.");
    }else{
      $("#output").text(Math.round(endPercent * 100) + "% Alc. by Vol.");
    }
    
    //reset values.
    aTot = 0;
    pTot = 0;
    mTot = 0;
    percentArray = [];
    newArray = [];
    aSum = 0;
  });

  //add a booze item
  $("#addBooze").click(function(){
    $(".boozeItem:first").clone()
                         .find("input:text").val("").end()
                         .insertBefore("#addBooze");
  });

  //add a mixer item
  $("#addMixer").click(function(){
    $(".mixerItem:first").clone()
                         .find("input:text").val("").end()
                         .insertBefore("#addMixer");
  });

});