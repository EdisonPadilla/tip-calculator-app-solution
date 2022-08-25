"use strict";
let tip = 0;
let people = 0;
let tipAmount = 0;
let total = 0;
let inputValuesObj = {
  bill: "0",
  tip: "Custom",
  people: "0",
};
let inputBill = [];
let inputCustom = [];
let inputPeople = [];
let validValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const d = document;
const $input_bill = d.getElementById("input-bill");
const $messages_active = d.querySelectorAll(".message-active-state");
const $tip_options = d.querySelectorAll(".tip-options .tip");
const $input_custom = d.getElementById("input-tipcustom");
const $input_people = d.getElementById("input-people");
const $tipamount_value = d.getElementById("tipamount-value");
const $total_value = d.getElementById("total-value");
const $reset_button = d.querySelector(".reset-btn");

function renderizarResultado() {
  $tipamount_value.textContent = `$ ${tipAmount.toFixed(2)}`;
  $total_value.textContent = `$ ${total.toFixed(2)}`;
}

function handleInput(key, arr, valid = validValues) {
  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }

  if (valid.includes(key) || key === ".") {
    if (arr.includes(".")) {
      if (key === ".") return;
      if (arr.slice(arr.indexOf(".") + 1).length === 2) return;
    }

    if (arr[0] === ".") {
      return;
    }

    if (arr[0] === "0" && arr.length === 1) {
      if (key === ".") {
        arr.push(key);
      }
      return;
    }

    arr.push(key);
  }
}

function handleInputPeople(key, arr, valid = validValues) {
  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }

  if (valid.includes(key)) {
    if (arr[0] === "0") {
      return;
    }
    arr.push(key);
  }
}

function calcular() {
  tipAmount =
    (parseFloat(inputValuesObj.bill) * parseFloat(inputValuesObj.tip)) /
    100 /
    parseInt(inputValuesObj.people);

  total =
    parseFloat(inputValuesObj.bill) / parseInt(inputValuesObj.people) +
    tipAmount;

  console.log("Tip amount: ");
  console.log(tipAmount.toFixed(2));

  console.log("Total: ");
  console.log(total.toFixed(2));
}

function validToCalculate() {
  let arrayInputValues = Object.values(inputValuesObj);

  if (arrayInputValues.includes("") || arrayInputValues.includes("Custom")) {
    console.warn("alguno/s esta vacío");
    $tipamount_value.textContent = `$ 0.00`;
    $total_value.textContent = `$ 0.00`;
    arrayInputValues.forEach((value, index) => {
      if (value === "" || value == "Custom") {
        // console.log($messages_active[index].textContent);
        $messages_active[index].textContent = `Can't be empty`;
      } else {
        $messages_active[index].textContent = "";
      }
    });
  } else {
    console.warn("Todos ingresados");
    if (arrayInputValues.includes("0")) {
      console.warn("alguno/s es cero");
      $tipamount_value.textContent = `$ 0.00`;
      $total_value.textContent = `$ 0.00`;

      arrayInputValues.forEach((value, index) => {
        if (value === "0") {
          // console.log($messages_active[index].textContent);
          $messages_active[index].textContent = `Can't be zero`;
        } else {
          $messages_active[index].textContent = "";
        }
      });
    } else {
      console.info("Valores Válidos");
      arrayInputValues.forEach((value, index) => {
        $messages_active[index].textContent = "";
      });
      calcular();
      renderizarResultado();
    }
  }
}

function resetear() {
  tip = 0;
  tipAmount = 0;
  total = 0;
  inputBill.length = 0;
  inputCustom.length = 0;
  inputPeople.length = 0;
  inputValuesObj.bill = "0";
  inputValuesObj.tip = "Custom";
  inputValuesObj.people = "0";
  $input_bill.value = inputValuesObj.bill;
  $input_custom.value = inputValuesObj.tip;
  $input_people.value = inputValuesObj.people;
  $tipamount_value.textContent = `$ 0.00`;
  $total_value.textContent = `$ 0.00`;
}

$input_bill.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }

  e.preventDefault();

  handleInput(e.key, inputBill);
  $input_bill.value = inputBill.join("");
  inputValuesObj.bill = $input_bill.value;
  console.info("valores ingresados: ", Object.values(inputValuesObj));
  validToCalculate();
});

$input_custom.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }

  e.preventDefault();

  handleInput(e.key, inputCustom);
  $input_custom.value = inputCustom.join("");
  tip = $input_custom.value;
  inputValuesObj.tip = tip;
  console.info("valores ingresados: ", Object.values(inputValuesObj));
  validToCalculate();
});

$input_people.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }

  e.preventDefault();

  handleInputPeople(e.key, inputPeople);
  $input_people.value = inputPeople.join("");
  inputValuesObj.people = $input_people.value;
  console.info("valores ingresados: ", Object.values(inputValuesObj));
  validToCalculate();
});

$tip_options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // styles for active states
    Array.from($tip_options).map((btn) => btn.classList.remove("selected"));
    $input_custom.classList.remove("selected-custom");
    option.classList.add("selected");
    // to work with the tip value
    tip = option.value;
    inputValuesObj.tip = tip;
    console.info("valores ingresados: ", Object.values(inputValuesObj));
    $input_custom.value = "Custom";
    inputCustom.length = 0;
    validToCalculate();
  });
});

$input_custom.addEventListener("click", () => {
  Array.from($tip_options).map((btn) => btn.classList.remove("selected"));
  $input_custom.classList.add("selected-custom");
});

$reset_button.addEventListener("click", () => {
  resetear();
  Array.from($tip_options).map((btn) => btn.classList.remove("selected"));
  $input_custom.classList.remove("selected-custom");
});

$input_bill.value = inputValuesObj.bill;
$input_custom.value = inputValuesObj.tip;
$input_people.value = inputValuesObj.people;

console.log("Valores Ingresados: ", Object.values(inputValuesObj));
