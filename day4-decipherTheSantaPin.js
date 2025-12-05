/* Challenge #4: Decipher the Santa Pin

Write a function that deciphers the PIN from the code.

The code is made up of blocks between brackets [...] and each block generates one digit of the PIN.

A normal block has the form [nOP...], where n is a number (0-9) and after it there can be a list of (optional) operations.

The operations are applied in order to the number and are:

    + adds 1
    - subtracts 1

The result is always a digit (mod 10 arithmetic), for example 9 + 1 → 0 and 0 - 1 → 9.

There is also the special block [<], which repeats the digit from the previous block.

If in the end there are fewer than 4 digits, you must return null. */


function decodeSantaPin(code) {
  let pin = "";
  let arr = code.replaceAll(/\[|\]/g, ' ').split('  ');
  if (arr.length < 4) {
    return null
  }
  for (let i = 0; i < arr.length; i++) {
    let number = parseInt(arr[i]);
    if (arr[i].includes('+')) {
        number += (arr[i].split('').filter(el => el === '+')).length;
    } else if ((arr[i].includes('-'))) {
        number -= (arr[i].split('').filter(el => el === '-')).length;
    }
    if (arr[i].trim() === '<') {
        pin += `${pin[pin.length-1]}`
    } else {
        pin += `${((number % 10) + 10) % 10}`
    }
  }
  return pin;
}


// Examples

console.log(decodeSantaPin('[1++][2-][3+][<]'));
// "3144"

console.log(decodeSantaPin('[9+][0-][4][<]'));
// "0944"

console.log(decodeSantaPin('[1+][2-]'));
// null (only 2 digits)
