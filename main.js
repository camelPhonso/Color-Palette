const hexDigits = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
const reversedHexDigits = ['F','E','D','C','B','A',9,8,7,6,5,4,3,2,1,0];

const analogousColors = document.querySelectorAll('.analogous--color');
const complementaryColors = document.querySelectorAll('.complementary--color');

//this function will generate a random color to attribute to the first .color-pair__top
function generateColor(){
    let temporaryHex = '';
    for (let i = 0; i < 6; i++){
        let digit = Math.floor((Math.random() * 16));
        temporaryHex += (hexDigits[digit]);
    };

    window.randomColor = temporaryHex; //randomColor is a global variable in relation to which all other colors will be defined

    // window.firstColorDisplay = document.querySelector('.color-pair__top');
    // firstColorDisplay.setAttribute('name',temporaryHex);
    // firstColorDisplay.style.backgroundColor = `#${randomColor}`;

};

function generateAnalogous(array, div){
     //this function will generate colors that are side by side with the argument
    //this will be used to generate .color-pair__top colors following the first randomColor
    if(div == analogousColors.length) return;
    console.log('cycle - ' + div); //to test recursion
    
    let baseColor = randomColor.split('');
    let tempColor = [];
    
    let isHexNumber = (/[0-8]/);
    let isHexLetter = (/[A-F]/);
    
    for (let i = 0; i < baseColor.length; i++){
        isHexNumber.test(baseColor[i]) ? tempColor.push(Number(baseColor[i]) + 1) : isHexLetter.test(baseColor[i]) ? tempColor.push(reversedHexDigits[Math.floor(Math.random() * 7)]) : tempColor.push('1');
    };

    console.log(`base color - ${baseColor}`);
    console.log(`new color - ${tempColor}`);
    randomColor = tempColor.join('');

    array[div].style.backgroundColor = `#${randomColor}`
    
    generateAnalogous(array, div + 1);

};

function generateComplementary(div){
    //this function will generate a complementary color to the argument
    //this will be used to generate every .color-pair__bottom based on its pairing top
    
    let temporaryArray = div.getAttribute('name').split('');
    let temporaryHex = '';
    
    for (let i = 0; i < temporaryArray.length; i++){
        for(let j = 0; j < hexDigits.length; j++){
            temporaryArray[i] == hexDigits[j] ? temporaryHex += reversedHexDigits[j] : null;
        };
    };
    
    // let parentColorPair = ; --> this line has been changed and not tested **CHECK && REMOVE**
    
};



generateColor();
generateAnalogous(analogousColors, 0);