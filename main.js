let randomColor;
const hexDigits = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
const reversedHexDigits = ['F','E','D','C','B','A',9,8,7,6,5,4,3,2,1,0];

//this function will generate a random color to attribute to the first .color-pair__top
function generateColor(){
    let temporaryHEX = '';
    for (let i = 0; i < 6; i++){
        let digit = Math.floor((Math.random() * 16));
        temporaryHEX += (hexDigits[digit]);
    };

    randomColor = temporaryHEX; //randomColor is a global variable in relation to which all other colors will be defined

    window.firstColorDisplay = document.querySelector('.color-pair__top');
    firstColorDisplay.setAttribute('name',temporaryHEX);
    firstColorDisplay.style.backgroundColor = `#${randomColor}`;
    firstColorDisplay.classList.add('has-color');

    generateAnalogous(firstColorDisplay); //while testing - **REMOVE**

};

function generateAnalogous(div){
    //this function will generate colors that are side by side with the argument
    //this will be used to generate .color-pair__top colors following the first randomColor
    
    let temporaryArray = div.getAttribute('name').split();
    let temporaryHEX = '';

    console.log(temporaryArray); //testlog **REMOVE**

    for (let i = 0; i < temporaryArray.length; i + 2){
        new RegExp(/[A-F]/g).test(temporaryArray[i]) || new RegExp(/[6-9]/g).test(temporaryArray[i]) ? temporaryArray[i] = 6 || 'D' : null;
    };
    console.log(temporaryArray);


};

function generateComplementary(div){
    //this function will generate a complementary color to the argument
    //this will be used to generate every .color-pair__bottom based on its pairing top
    
    let temporaryArray = div.getAttribute('name').split('');
    let temporaryHEX = '';
    
    for (let i = 0; i < temporaryArray.length; i++){
        for(let j = 0; j < hexDigits.length; j++){
            temporaryArray[i] == hexDigits[j] ? temporaryHEX += reversedHexDigits[j] : null;
        };
    };
    
    // let parentColorPair = ; --> this line has been changed and not tested **CHECK && REMOVE**
    let colorPairBottom = div.parentNode.lastElementChild;
    
    colorPairBottom.style.backgroundColor = `#${temporaryHEX}`;
    colorPairBottom.classList.add('has-color');
};



function generateScheme(){
    
    let colorsDisplayed = document.querySelectorAll('.has-color');
    for (let color of colorsDisplayed){
        generateComplementary(color);
    };
    
};

generateColor();
generateScheme()