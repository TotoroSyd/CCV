// capture input from user
const button = document.querySelector(".btn");
const regex = /^[0-9]+$/;
let result = document.querySelector("result");

button.addEventListener("click", function (event) {
  event.preventDefault();
  let user_input = document.querySelector("#cardNumber").value; //document.cardForm.cardNumber.value
  // check if input is number + prevent empty string in input.
  if (!user_input.match(regex)) {
    console.warn("Wrong input type");
    alert("Must input numbers");
  } else {
    let output = cardCheck(user_input);
    // return the result var to HTML using inner.HTML
    result.innerHTML = output;
  }
});

function cardCheck(user_input) {
  const l = user_input.length;

  // find the digits backward starting from the second-to-last digit
  let arr_reverse_0 = [];

  let counter_1 = 0;
  for (let i = l - 2; i >= 0; i -= 2) {
    arr_reverse_0[counter_1] = user_input[i];
    counter_1++;
  }
  //   console.log(`arr reverse: ${arr_reverse_0}`);

  // store the rest of the digits
  let arr_0 = [];
  let counter_0 = 0;
  for (let x = l - 1; x >= 0; x -= 2) {
    arr_0[counter_0] = parseInt(user_input[x], 10);
    counter_0++;
  }
  //   console.log(`arr: ${arr_0}`);

  //  multiply every other digit in arr_reverse_0 by 2. store in arr_reverse_1
  let arr_reverse_multiply = [];
  for (let j = 0; j < arr_reverse_0.length; j++) {
    arr_reverse_multiply[j] = arr_reverse_0[j] * 2;
  }

  //  then add those products’ digits together (not the products itself)
  let sum_0 = 0;
  for (let k = 0; k < arr_reverse_multiply.length; k++) {
    if (arr_reverse_multiply[k] < 10) {
      sum_0 = sum_0 + arr_reverse_multiply[k];
    } else {
      sum_0 = sum_0 + 1 + parseInt([arr_reverse_multiply[k] % 10], 10); // without parseInt, error. Why?
    }
  }
  //   console.log(`sum_0: ${sum_0}`);

  //  Add sum_0 with the sum of the digits that weren’t multiplied by 2
  const reducer = (acc, cur) => acc + cur;
  const sum_of_arr_0 = arr_0.reduce(reducer);
  const final_sum = sum_0 + sum_of_arr_0;
  //   console.log(`final sum: ${final_sum}`);

  // check if the card is legit

  if (final_sum % 10 !== 0) {
    return "INVALID";
  } else {
    let first_e = user_input[0];
    let first_2e = user_input[0] + user_input[1];
    if (l === 13 && first_e.localeCompare("4") === 0) {
      return "VISA";
    } else if (l === 16 && first_e.localeCompare("4") === 0) {
      return "VISA";
    } else if (
      l === 16 &&
      (first_2e.localeCompare("51") === 0 ||
        first_2e.localeCompare("52") === 0 ||
        first_2e.localeCompare("53") === 0 ||
        first_2e.localeCompare("54") === 0 ||
        first_2e.localeCompare("55") === 0)
    ) {
      return "MASTERCARD";
    } else if (
      l === 15 &&
      (first_2e.localeCompare("34") === 0 || first_2e.localeCompare("37") === 0)
    ) {
      return "AMEX";
    } else {
      return "INVALID";
    }
  }
}

// --------- NOTE ---------
/* check if input is number
Failed: Use type="number" in HTML will create an arrow up and down to change number. It will affect the card number

Test case passed: 5h, h, 55, ,
Test case failed: 10.5
if (isNaN(user_input) || user_input === "" || user_input ==null) {
    alert("Must input numbers");
    return false;
} else {
    console.log(user_input);
} */

// Check the length of input. Done by maxlength in HTML

//   // create reference object
//   let dict = {};
//   dict[4] = "VISA";
//   dict[51] = "MASTERCARD";
//   dict[52] = "MASTERCARD";
//   dict[53] = "MASTERCARD";
//   dict[54] = "MASTERCARD";
//   dict[55] = "MASTERCARD";
//   dict[34] = "AMEX";
//   dict[37] = "AMEX";
