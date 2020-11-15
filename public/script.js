//import {Big} from '/big.js';

let counterElement = document.getElementById('cakeElement');
let perClickElement = document.getElementById('cakePerClickElement');
let upgradeGrid = document.getElementById("upgradeButtons");

let localStorageKey = "UniversalCakeGame";
let saveDataInterval = 2 * 60 * 1000;

var cake = 0n;
var cakePerClick = 1n;
var buttonCount = 102;
var buttonCostMultiplier = 0.9;

var million = {number:10n ** 6n, word:'million'}
var billion = {number:10n ** 9n, word:'billion'}
var trillion = {number:10n ** 12n, word:'trillion'}
var quadrillion = {number:10n ** 15n, word:'quadrillion'}
var quintillion = {number:10n ** 18n, word:'quintillion'}
var sextillion = {number:10n ** 21n, word:'sextillion'}
var septillion = {number:10n ** 24n, word:'septillion'}
var octillion = {number:10n ** 27n, word:'octillion'}
var nonillion = {number:10n ** 30n, word:'nonillion'}
var decillion = {number:10n ** 33n, word:'decillion'}
var undecillion = {number:10n ** 36n, word:'undecillion'}
var duodecillion = {number:10n ** 39n, word:'duodecillion'}
var tredecillion = {number:10n ** 42n, word:'tredecillion'}
var quattuordecillion = {number:10n ** 45n, word:'quattuordecillion'}
var quindecillion = {number:10n ** 48n, word:'quindecillion'}
var hexdecillion = {number:10n ** 51n, word:'hexdecillion'}
var septendecillion = {number:10n ** 54n, word:'septendecillion'}
var octodecillion = {number:10n ** 57n, word:'octodecillion'}
var novemdecillion = {number:10n ** 60n, word:'novemdecillion'}
var vigintillion = {number:10n ** 63n, word:'vigintillion'}
var unvigintillion = {number:10n ** 66n, word:'unvigintillion'}
var duovigintillion = {number:10n ** 69n, word:'duovigintillion'}
var trevigintillion = {number:10n ** 72n, word:'trevigintillion'}
var quattourvigintillion = {number:10n ** 75n, word:'quattourvigintillion'}
var quinvigintillion = {number:10n ** 78n, word:'quinvigintillion'}
var hexvigintillion = {number:10n ** 81n, word:'hexvigintillion'}
var septenvigintillion = {number:10n ** 84n, word:'septenvigintillion'}
var octvigintillion = {number:10n ** 87n, word:'octovigintillion'}
var novemvigintillion = {number:10n ** 90n, word:'novemvigintillion'}
var trigintillion = {number:10n ** 93n, word:'trigintillion'}
var untrigintillion = {number:10n ** 96n, word:'untrigintillion'}
var doutrigintillion = {number:10n ** 99n, word:'duotrigintillion'}
var googol = {number:10n ** 100n, word:'googol'}


let numberFormatArray = [million, billion, trillion, quadrillion, quintillion, sextillion, septillion, octillion, nonillion, 
                        decillion, undecillion, duodecillion, tredecillion, quattuordecillion, quindecillion, hexdecillion, 
                        septendecillion, octodecillion, novemdecillion, vigintillion, unvigintillion, duovigintillion, trevigintillion,
                        quattourvigintillion, quinvigintillion, hexvigintillion, septenvigintillion, septenvigintillion,
                        octvigintillion, novemvigintillion, trigintillion, untrigintillion, doutrigintillion, googol];

loadUserData();

counterElement.innerText = "Cake: " + formatNumber(cake, 3);
perClickElement.innerText = "Cake per Click: (C/C): " + formatNumber(cakePerClick, 3);

window.onbeforeunload = saveUserData;

window.addEventListener("beforeunload", saveUserData, false);

function saveUserData() {

    let userScoreData = {
        "cake":cake.toString(),
        "cakePerClick":cakePerClick.toString()};

    let dataString = JSON.stringify(userScoreData);

    localStorage.setItem(localStorageKey, dataString);

    console.log("Saving user data locally...");

}

function loadUserData() {

    console.log("Loading user data...");

    let userScoreData = JSON.parse(localStorage.getItem(localStorageKey));

    cake = BigInt(userScoreData.cake);
    cakePerClick = BigInt(userScoreData.cakePerClick);

}



setInterval(saveUserData, saveDataInterval);

function stickScroll() {

    const isScrolledToBottom = upgradeGrid.scrollHeight - upgradeGrid.clientHeight <= upgradeGrid.scrollTop + 1;


    if (!isScrolledToBottom) {

        upgradeGrid.scrollTop = 10 ** 10;

    }

    

}


function obtainCake() {

    cake += cakePerClick;
    counterElement.innerText = "Cake: " + formatNumber(cake, 3);
    checkForLiveButtons();
}

function increaseCakePerClick(cakeCost, cakeIncrease) {

    if (cakeCost <= cake) {
        cake -= BigInt(cakeCost);
        cakePerClick += BigInt(cakeIncrease);
        counterElement.innerText = "Cake: " + formatNumber(cake, 3);
        perClickElement.innerText = "Cake per Click: (C/C): " + formatNumber(cakePerClick, 3);
        checkForLiveButtons();
    }
}

function checkForLiveButtons() {

    for (let buttonListIndex = 0; buttonListIndex < buttonList.length; buttonListIndex++){

        if (10 ** (buttonListIndex + 1) > cake){
            buttonList[buttonListIndex].disabled = true;
        }
        else{
            buttonList[buttonListIndex].disabled = false;

            if (buttonListIndex + 1 < buttonList.length){

                if (buttonList[buttonListIndex + 1].style.display == "none") {

                    buttonList[buttonListIndex + 1].style.display = "grid";
                    stickScroll();
    
                }
            }
            
            

        }

    }

}



function formatNumber(number, places) {

    for (let numberIndex = 0; numberIndex < numberFormatArray.length; numberIndex++){

        if (numberFormatArray[numberIndex].number > number){

            if (numberIndex == 0){

                if (number < 1000000n){
                    
                    return number.toLocaleString();

                }

            }
            
            else{

                let dividedNumber = number / (numberFormatArray[numberIndex - 1].number / (10n ** 3n));

                let numberString = (Number(dividedNumber) / 1000).toFixed(places);

                return numberString + " " + numberFormatArray[numberIndex - 1].word;
    
            }

        }

        else if (numberIndex == numberFormatArray.length - 1 && numberFormatArray[numberFormatArray.length - 1].number <= number){

            let dividedNumber = number / (numberFormatArray[numberIndex].number / (10n ** 3n));

            let numberString = (Number(dividedNumber) / 1000).toFixed(places);

            return numberString + " " + numberFormatArray[numberIndex].word;

        }

    }
}

var buttonList = new Array();

for (let buttonIndex = 0; buttonIndex < buttonCount; buttonIndex++) {

    let bigIntIndex = BigInt(buttonIndex)

    let buttonCost = 10n ** (bigIntIndex + 1n);
    let buttonIncrease = 10n ** bigIntIndex;

    let upgradeButtonElement = document.createElement('button');

    upgradeButtonElement.onclick = function() {

        let newButtonCost = buttonCost;
        let newButtonIncrease = buttonIncrease;

         return increaseCakePerClick(newButtonCost, newButtonIncrease);
    };

    upgradeButtonElement.style.padding = "10px";
    upgradeButtonElement.style.borderStyle = "none";
    upgradeButtonElement.style.borderRadius = "8px";
    upgradeButtonElement.style.margin = "2% 2% 2% 2%";
    upgradeButtonElement.style.textAlign = "left";
    upgradeButtonElement.style.alignSelf = "right";
    upgradeButtonElement.style.width = "95%";

    upgradeButtonElement.innerText = "Increase C/C by " + formatNumber(buttonIncrease, 0) + " for " + formatNumber(buttonCost, 0);
    upgradeButtonElement.disabled = true;
    upgradeButtonElement.style.display = "none";
    upgradeButtonElement.draggable = false;

    buttonList.push(upgradeButtonElement);

    upgradeGrid.appendChild(upgradeButtonElement);
}

buttonList[0].style.display = "grid";

checkForLiveButtons();