const convertBtn = document.querySelector(".convert__btn button");

const swap = document.querySelector(".convert__icon i")

const imgURL = "https://flagsapi.com/INR/flat/32.png";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const output = document.querySelector(".output");

const fromFlag = document.querySelector(".from__select img");
const toFlag = document.querySelector(".to__select img");

const from = document.querySelector("#from");
const to = document.querySelector("#to");

from.addEventListener("change", (evt) => {
  let currCode = evt.target.value;
  currCode = currCode.toUpperCase();
  let conCode = countryList[currCode];
  let newUrl = `https://flagsapi.com/${conCode}/flat/32.png`;
  fromFlag.setAttribute("src", newUrl);
});

to.addEventListener("change", (evt) => {
  let currCode = evt.target.value;
  currCode = currCode.toUpperCase();
  let conCode = countryList[currCode];
  let newUrl = `https://flagsapi.com/${conCode}/flat/32.png`;
  toFlag.setAttribute("src", newUrl);
});
(async function () {
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode.toLowerCase();
    if (currCode === "USD") newOption.selected = "selected";
    from.append(newOption);
  }

  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode.toLowerCase();
    if (currCode === "INR") newOption.selected = "selected";
    to.append(newOption);
  }
  const response = await fetch(`${BASE_URL}/usd/inr.json`);
  const result = await response.json();
  let op = result.inr.toFixed(2);
  output.innerText = `1 USD = ${op} INR`;
})();

swap.addEventListener('click', () => {

  //swapping currency codess
  const temp = from.value
  from.value = to.value
  to.value = temp

  //swapping country flag
  const temp2 = fromFlag.getAttribute('src')
  fromFlag.setAttribute('src', toFlag.getAttribute('src'))
  toFlag.setAttribute('src', temp2)
})

const currencyConverter = async () => {
  const inputEle = document.querySelector(".converter__input input");
  if (inputEle.value === "") {
    output.innerText = "Amount is required for conversion";
    convertBtn.innerText = 'Convert'
    return;
  }
  let inputAmt = Number(inputEle.value);

  if(inputAmt < 0){
    inputAmt *= -1
    inputEle.value = inputAmt
  }

  const fromCode = document.querySelector(".from__select select").value;
  const toCode = document.querySelector(".to__select select").value;

  const response = await fetch(`${BASE_URL}/${fromCode}/${toCode}.json`);

  const result = await response.json();

  const exRate = result[toCode];

  let op = inputAmt * exRate;

  op = op.toFixed(2);

  output.innerText = `${inputAmt} ${fromCode.toUpperCase()} = ${op} ${toCode.toUpperCase()}`;
  convertBtn.innerText = 'Convert'
}

convertBtn.addEventListener("click", () => {
  setTimeout(currencyConverter, 500)
  convertBtn.innerText = 'Converting...'
});
