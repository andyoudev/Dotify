var myRows = 10;
var myCols = myRows;
var animCycles = 10;
var myIntv;

//old-----
// var dataFromString = [];
// var dataFromDate = [];
// var dataFromNumber = [];

//these-------
var myColorsArray = [];
var circsToChColor = [];
var circsToMakeMed = [];
var circsToMakeLg = [];


for(i=0; i<myRows; i++) {
    for(k=0; k<myCols; k++) {
    var myGrid = document.getElementById("mainGrid");
    const newSpacer = document.createElement("div");
    const newCircle = document.createElement("div");

    newSpacer.classList.add("mySpacer");
    newCircle.classList.add("circle");

    var idString = String(i) + String(k);

    newCircle.setAttribute("id", idString);

    newSpacer.appendChild(newCircle);
    document.getElementById("mainGrid").appendChild(newSpacer);
    }
}

document.getElementById("btnStrConvert").addEventListener("click", changeByInputData);
document.getElementById("btnRandomRun").addEventListener("click", generateRandom);
document.getElementById("btnRandomAnim").addEventListener("click", randomAnimate);
document.getElementById("btnResetSizes").addEventListener("click", resetBtn);

function changeByInputData () {

    //window.clearInterval(myIntv);

    var longStrEntered = document.getElementById("myStringToConvert").value;

    changeCirclesByText(longStrEntered);

}

function generateRandom () {

    var randomStr = Math.random().toString(36).substr(2, 10);
    var longStrEntered = randomStr.concat(Math.random().toString(36).substr(2, 10),Math.random().toString(36).substr(2, 10),Math.random().toString(36).substr(2, 10),Math.random().toString(36).substr(2, 10));
    var dateEntered = String(Math.floor(Math.random() * 99999999) +1);
    var numEntered = String(Math.floor(Math.random() * 99999999999999999999999) +1);

    resetCircSizes2();
    changeCirclesByText(longStrEntered);

}

function randomAnimate () {

    var myIntervalTime = 1500;
    var animCyclesCount = 0;

     myIntv = setInterval(function() {

        animCyclesCount++;
        generateRandom();
        if(animCyclesCount>=animCycles) {
            //if(animCycles>=animCyclesLimmit) {
            window.clearInterval(myIntv);
        }
        }, myIntervalTime);

}

function changeCirclesByText (myLongStr) {

//get entered values
var longStrEntered = myLongStr;
var numToUse = String(Math.floor(Math.random() * 99999999999999999999999) +1);

var textLength = longStrEntered.length;

var colourQty = Math.min(0.5*myRows*myCols, 0.6*textLength);
var medQty = Math.floor((Math.random() * (Math.min(0.05*myRows*myCols, 0.1*textLength))));
var bigQty = Math.floor((Math.random() * (Math.min(0.02*myRows*myCols, 0.04*textLength))));

myColorsArray = generateColorsArr(colourQty, numToUse);

var strEnteredToLongNum = convertLongWordtoNum(longStrEntered);
circsToChColor = splitLongnumber(strEnteredToLongNum);

changeCircleColor(colourQty, medQty, bigQty);

}


// function dateToNumStr (dateToConv) {
//     const myDate = new Date(dateToConv);
//     var dateMilliSecs = Math.abs(Number(myDate));
//     var dateToStr = String(dateMilliSecs);
//     var finalDateData = dateToStr.replace(/0/g,"");
// return finalDateData;
// }

function splitLongnumber (noToSplit) {

var longStringNos = noToSplit.toString();
var lenToSplit = longStringNos.length/2;
var firstHalf = longStringNos.substr(0, lenToSplit).split("");
var secndHalf = longStringNos.substr(lenToSplit, longStringNos.length - 1).split("");

var joinedNumbers = [];

for(i=0; i<firstHalf.length; i++) {
    var joined = firstHalf[i].concat(secndHalf[i]);
    joinedNumbers.push(joined);
    }

//console.log(joinedNumbers);
return joinedNumbers;
}

function convertLongWordtoNum (longword) {
    //var longword = "isdlaksdjlaksdl";
    var splitLongWord = longword.split("");
    var arrayofNumbers = [];

    for(i=0; i<splitLongWord.length; i++) {
        var char = splitLongWord[i].charCodeAt(0);
        arrayofNumbers.push(char);
    }

    var longstringofNumbers = arrayofNumbers.toString().replace(/,/g,"");

    // console.log(splitLongWord);
    // console.log(arrayofNumbers);
    // console.log(longstringofNumbers);

   return  longstringofNumbers;
}

function generateColorsArr (colourQty, longNum) {
//    var longStr = "kjhasdfdfsdjfs";
//    var longNum = "28309277340978234";
//    var colorsQty = 3;//colourQty;
    var allowedLetters = ["A", "B", "C", "D", "E", "F"];
    var colorsArr = [];

    for(i=0; i<colourQty; i++) {
        var newColor = "";
        for(k=0; k<6; k++) {
            var letterOrNum = Math.floor((Math.random() * 2) + 1);
            var randomNo6 = Math.floor((Math.random() * 6));
            var randomNoN = Math.floor((Math.random() * longNum.length) + 1);
            if(letterOrNum === 1) {
                newColor = newColor.concat(allowedLetters[randomNo6]);
            } else {
                newColor = newColor.concat(longNum.charAt(randomNoN));
            }
        }
    colorsArr.push(newColor);
    }
    //console.log(colorsArr);
    return colorsArr;
}

function changeCircleColor (myQty, medQty, lgQty) { //, id, color) {
    var runMedQty = medQty;
    var runLgQty = lgQty;
    var randSizeChange = Math.floor(Math.random() * 8);

    for(i=0; i<myQty; i++) {
        var circId = String(circsToChColor[i]);
        //console.log(circId);
        var testElm = document.getElementById(circId);

      if(testElm.className != "circleX") {
        myColor = String("#" + myColorsArray[i]);
        //console.log(myColor);
        //console.log(testElm);
        testElm.style.backgroundColor = myColor;
        var medAllowed = toMedAllowed(circId);
        var lgAllowed = toLgAllowed(circId);

        if(randSizeChange > 6 && runLgQty > 0 && lgAllowed != 0) {
          //make bigQty
          changeToLgById(circId);
          runLgQty--;
        } else if (randSizeChange > 2 && runMedQty > 0 && medAllowed != 0) {
          //make med
          changeToMedById(circId);
          runMedQty--;
        }
      }
    }

}

function toMedAllowed (myId) {

  var mySlice = myId.slice(1);
  var mySlice2 = myId.slice(0,1);

  if(mySlice === "9" || mySlice2 === "9") {
    //console.log(myId + ":0");
    return 0;
  } else {
    //console.log(myId + ":1");
    return 1;
  }
}

function toLgAllowed (myId) {

  var mySlice = myId.slice(1);
  var mySlice2 = myId.slice(0,1);

  if(mySlice === "9" || mySlice2 === "9" || mySlice === "8" || mySlice2 === "8") {
    //console.log(myId + ":0");
    return 0;
  } else {
    //console.log(myId + ":1");
    return 1;
  }
}

function changeToMedById (myId) {

    //for(i=0; i<myQty; i++) {
    var id = String(myId);
    var firstIdDig = id.slice(0,1);
    var add0 = "0";
    var hideArr = ["", "", ""];

    var idAsNum = Number(id);

    hideArr[0] = String(idAsNum + 1);
    if(firstIdDig === "0") {
        hideArr[0] = add0.concat(hideArr[0]);
    }

    hideArr[1] = String(idAsNum + 10);
    hideArr[2] = String(idAsNum + 11);

    console.log("myId " + myId);
    console.log("id " + id);
    console.log("hideOne " + hideArr[0]);
    console.log(hideArr[1]);
    console.log("hideThr " + hideArr[2]);


    document.getElementById(id).classList.add("circleMed");

    hideCircles(hideArr[0]);
    hideCircles(hideArr[1]);
    hideCircles(hideArr[2]);

}

function hideCircles (hide) {
  //var circles = [hide1, hide2, hide3];

  //for(i=0; i<circles.length; i++) {
    var cir = document.getElementById(hide);
    cir.classList.remove("circle");
    cir.classList.remove("circleMed");
    cir.classList.remove("circleLg");
    cir.classList.add("circleX");
    cir.style.backgroundColor = "";
  //}
}



function changeToLgById (myId) {

    //for(i=0; i<myQty; i++) {
    var id = String(myId);//circsToMakeLg[i];
    var firstIdDig = id.slice(0,1);
    var add0 = "0";


    var idAsNum = Number(id);
    var hideOne = String(idAsNum + 1);
    if(firstIdDig === "0") {
        //hideOne
        hideOne = add0.concat(hideOne);
    }

    var hideTwo = String(idAsNum + 10);
    var hideThr = String(idAsNum + 11);
    var hideFou = String(idAsNum + 2);
    if(firstIdDig === "0") {
        //hideOne
        hideFou = add0.concat(hideFou);
    }

    var hideFiv = String(idAsNum + 20);
    var hideSix = String(idAsNum + 21);
    var hideSvn = String(idAsNum + 12);
    var hideEit = String(idAsNum + 22);
    document.getElementById(id).classList.add("circleLg");
    hideCircles(hideOne);
    hideCircles(hideTwo);
    hideCircles(hideThr);
    hideCircles(hideFou);
    hideCircles(hideFiv);
    hideCircles(hideSix);
    hideCircles(hideSvn);
    hideCircles(hideEit);

    //}
}

function resetBtn () {

  window.clearInterval(myIntv);

  resetCircSizes2();

}

function resetCircSizes2 () {

for(i=0; i<myRows; i++) {
    for(k=0; k<myCols; k++) {
        var idString = String(i) + String(k);
        var cir = document.getElementById(idString);
        cir.classList.remove("circleX");
        cir.classList.remove("circleMed");
        cir.classList.remove("circleLg");
        cir.classList.add("circle");
        cir.style.backgroundColor = "";
        var textEntered = document.getElementById("myStringToConvert");
        textEntered.value = "";
    }
}
}
