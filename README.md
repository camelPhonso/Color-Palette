# Color Palette
This project asks us to create a color palette that the user can interact by editing any of the colors displayed. The page should randomly generate different palettes and each pallete 
should be pleasing..

## Color Theory
Color Theory is not about specif colors, instead, it looks at the relationships between differing colors 
and suggests specific uses for possible pairings. I decided to base the coding for this challenge on that 
idea.

The color pallete in this page will generate one random color and then calculate subsequent colors with a 
specific relationship in mind. I have isolated two types of color combinations for this project.

### Analogousc Combinations
These are combinations of several colors that sit side-by-side on the color wheel. Together, they create 
a versatile palette with, usually, one color serving as a base and the others working as highlights. In 
this page, an analogous combination will be generated from the original random color we create. This will 
establish the first line of color in our pallete.

### Complementary Combinationss
Complementary colors are two colors that sit opposite eachother on the color wheel. The high contrast 
between them makes them appear brighter and more proeminent. In this color palette, a complementary color 
will be generated below each optionr displayed in the Analogous Combination, creating a second line of 
colors to our pallete.

## Developing the Color Pallete

### generateColor()
I started with a function called generateColor(), which randomly creates a HEX code and assignes it as the 
background color for the left-uppermost div in the page. This is done by simply picking 6 digits at random 
from the array hexDigits, which contains all 16 possible characters for a HEX code. Now we can begin to 
define the pallete in relation to randomColor. This will require two more functions.

### generateComplementary()
Once the first randomColor is defined, we can review the HEX code used and create all subsequent codes.
randomColor is a variable where the 6 digits of our first HEX code is stored globaly (without the hash 
character).

For the second row in our pallete we want to find the complementary color to each in the top row. 
generateComplementary() iterates through each character in randomColor and finds its match in the array 
hexDigits. Once we know which index that character lives in, the function pulls the same index from a 
separate array, reversedHexDigits. As the name indicates, this is an array that contains the same 
characters as hexDigits, but in the reversed order.
The end result is a new HEX code, called temporaryHEX, that gets assigned to the div with the class of 
.color-pair__bottom, with the same parent element as the div we originally called the function on.

### generateAnalogous()
Analogous colors sit side-by-side on the color wheel. The simplest ways to create this effect is to identify each digit of the current hex and replace it with an incremental value. To 
that effect, generateAnalogous() adds '1' to each number and replaces every letter with the following letter from an array of all letters available to a HEX code. To avoid invalid 
characters, any digit that returns the values '9' or 'F' is replaced with 'A' or '1' instead. This also avoids any one digit repeatedly circling through the same 10 numbers or 6 letters 
throughout the color palette.

### generateScheme()
Once each of the previous functions was working I needed to figure out the best way to iterate through them so that each new color got assigned to a display, before the next could be 
generated. The function generateScheme() uses recursion to achieve this. The function iterates through two provided arrays, one lists all the displays on HTML reserved for analogous 
colors, and the other lists all displays in HTML reserved for complementary colors.

Before this new function could be created, the original generateAnalogous() and generateComplementary() had to be adjusted to consider two arguments, an array and a number, in this case 
called 'div'. These two arguments will be fed to both functions when generateScheme() is called.

The base case for generateScheme() checks whether the arugment provided for 'cycle' equals the length of one fo the arrays provided (they will always both have the same length). If it 
does,the function will stop, otherwise, the function will call generateAnalogous() and generateComplementary() for the current cycle and then call itself again with an incremental argument 
for 'cycle'. The first array passed to generateScheme() is fed down to generateAnalogous() and the second is fed down to generateComplementary(), the number value of the argument 
'cycle' is also fed down to the other two functions as the argument for their 'cycle' parameter.

## Usability
With the color palette being generated on the page, we can focus on the user interface and usability of the page. I added an eventListne and a prompt on the page to let the user know 
they can generate a new color palette by pressing the key 'Enter'. This keeps the page with a minimal look, since it will be populated at each use with an assortment of colors, I prefer 
to keep its look clean and avoid having to combine too many elements (like buttons, for example) with all possible color combinations that will be displayed.

I also added a <p> element that is only displayed when hovering over a color. This element gets edited at each cycle so that it shows the HEX code for the color being displayed.

### Allowing the user to edit each generated color
All <p> elements were changed to <textarea> elements in order to allow the 
text to be highlighted and edited by the user. Once a user hovers over any 
color they can see the current hex code on the page and the cursor shows 
then that it can be selected.

There is an event listener attached to each of the .hex--display elements 
that will check every key input. Every time the HEX code on display is 
edited it will be checked against a regExp and, if it follows the 
parameters for a valid HEX code, it will be applied to the color display 
in focus immediately.

While testing this feature I found that I preferred to use the Spacebar 
to trigger a new color palette, rather than the 'Enter' key.
The event listeners ignore any press of the 'Enter' key and will .blur() 
the element currently in focus if the Spacebar is pressed, so that 
generateScheme() can perform normally (without this, the current HEX code 
would not update).
