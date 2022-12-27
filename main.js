const hexDigits = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
const reversedHexDigits = ['F','E','D','C','B','A',9,8,7,6,5,4,3,2,1,0];
const analogousColors = document.querySelectorAll('.analogous--color');
const complementaryColors = document.querySelectorAll('.complementary--color');

//this function will generate the first randomColor which the entire scheme will be based on
function generateColor(){
    let temporaryHex = '';
    for (let i = 0; i < 6; i++){
        let digit = Math.floor((Math.random() * 16));
        temporaryHex += (hexDigits[digit]);
    };

     //randomColor is a global variable in relation to which all other colors will be defined
     window.randomColor = temporaryHex;
};

//this function is recalled within generateAnalogous
//set here as a separate method for reading ease when reviewing generateAnalogous
function replaceLetters(example){
    let hexLetters = ['A','B','C','D','E','F'];
    window.letter;

    for (let i = 0; i < hexLetters.length; i++){
        example == hexLetters[i] ? letter = hexLetters[i+1] : null;
    };
    return letter;
};

//this function will generate a new color, analogous to the current randomColor
function generateAnalogous(array, div){
    let baseColor = randomColor.split('');
    let temporaryHex = [];
    
    let isHexNumber = (/[0-8]/);
    let isHexLetter = (/[A-E]/);
    
    for (let i = 0; i < baseColor.length; i++){
        isHexNumber.test(baseColor[i]) ? temporaryHex.push(Number(baseColor[i]) + 1) : isHexLetter.test(baseColor[i]) ? replaceLetters(baseColor[i]) && temporaryHex.push(letter) : baseColor[i] == '9' ? temporaryHex.push('1') : temporaryHex.push('A');
    };
    
    randomColor = temporaryHex.join('');
    
    array[div].style.backgroundColor = `#${randomColor}`
    let currentDisplay = array[div].querySelector('.hex--display');
    currentDisplay.classList.add('filled');
    currentDisplay.innerText = `#${randomColor}`;

};


//this function will generate a new color, complementary to the current randomColor
function generateComplementary(array, div){
    let baseColor = randomColor.split('');
    let temporaryHex = [];
    
    for (let i = 0; i < baseColor.length; i++){
        for(let j = 0; j < hexDigits.length; j++){
            baseColor[i] == hexDigits[j] ? temporaryHex.push(reversedHexDigits[j]) : null;
        };
    };
   
    array[div].style.backgroundColor = `#${temporaryHex.join('')}`;
    let currentDisplay = array[div].querySelector('.hex--display');
    currentDisplay.classList.add('filled');
    currentDisplay.innerText = `#${randomColor}`;
};

//this function uses recursion to initiate generateAnalogous() and generateComplementary() for each div on the page
function generateScheme(array1, array2, cycle){
    if(cycle == array1.length) return;
    
    generateAnalogous(array1, cycle);
    generateComplementary(array2, cycle);

    generateScheme(array1, array2, cycle+1);  
}

//initiate page
document.addEventListener('keydown', e =>{
    if(e.key === 'Enter'){
        generateColor();
        generateScheme(analogousColors, complementaryColors, 0);
    };
});