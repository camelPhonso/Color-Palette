# Color Pallete
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
