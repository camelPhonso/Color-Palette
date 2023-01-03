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
    
    window.randomColor = temporaryHex;
};

//this function will generate a new color, analogous to the current randomColor
function generateAnalogous(array, div){
    let baseColor = randomColor.split('');
    let temporaryHex = [];

    for (let i = 0; i < baseColor.length; i++){
            if(baseColor[i] === 'F'){
                temporaryHex.push(0);
        }else{
            for (let j = 0; j < hexDigits.length; j++){
                if(baseColor[i] == hexDigits[j]){
                    temporaryHex.push(hexDigits[j+1]);
                };
            };
        };
    };
                            
    randomColor = temporaryHex.join('');

    array[div].style.backgroundColor = `#${randomColor}`

    let currentDisplay = array[div].querySelector('.hex--display');
    currentDisplay.classList.add('filled');
    currentDisplay.value = `#${randomColor}`;
    
    let copyButton = currentDisplay.parentNode.querySelector('.fa-copy');
    copyButton.classList.add('filled');
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
    currentDisplay.value = `#${temporaryHex.join('')}`;
    
    let copyButton = currentDisplay.parentNode.querySelector('.fa-copy');
    copyButton.classList.add('filled');    
};

//this function uses recursion to initiate generateAnalogous() and generateComplementary() for each div on the page
function generateScheme(array1, array2, cycle){
    if(cycle === array1.length) return;
    
    generateAnalogous(array1, cycle);
    generateComplementary(array2, cycle);
    
    generateScheme(array1, array2, cycle+1);  
};

//this event listener will allow users to see the effect of edits made to any color on display
let hexEditors = document.querySelectorAll('.hex--display');
hexEditors.forEach((hex) => {
    hex.addEventListener('keydown', (e) => e.key == 'Enter' ? e.preventDefault() : e.key === ' ' ? hex.blur() : null);
    hex.addEventListener('keyup', (e) => {
        if(new RegExp(/([A-F]|[0-9]){6}/gi).test(hex.value)){
            hex.style.color = 'white';
            hex.parentElement.style.backgroundColor = `${hex.value}`;
        }else{
            hex.style.color = 'red';
        };
    });
});

//copy HEX to clipboard
function copyToClipboard(btn){
    let editedHex = btn.parentNode.querySelector('.hex--display')
    editedHex.select();
    document.execCommand('copy');
    window.alert('Copied to clipboard');
};

//initiate page
document.addEventListener('keydown', e =>{
    if(e.key === ' '){
        generateColor();
        generateScheme(analogousColors, complementaryColors, 0);
    };
});