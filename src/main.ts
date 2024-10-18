import "./style.css";

interface Item{
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems : Item [] = [
  {name: "Apple Farm", cost: 10, rate: 0.1, description: "A small apple farm with a couple dozen trees!"},
  {name: "Apple Orchard", cost: 100, rate: 2, description: "A large orchard with apple trees for as far as you can see!"},
  {name: "Apple Factory", cost: 1000, rate: 50, description: "A factory that produces apples?"},
  //{name: "Apple Planet", cost: 5000, rate: 250, description: "A whole world dedicated to the production of apples"},
  //{name: "Apple Multiplyer", cost: 10000, rate: 500, description: "Put in one apple, and 500 comes out??"}
];

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "A Nifty Apple Collector!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🍎";
app.append(button)

let clickCounter = 0;
let growthRate = 0;

//Click counter
const clickCounterDiv = document.createElement("div");
clickCounterDiv.id = "click-counter";
app.append(clickCounterDiv);

//Growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
app.append(growthRateDiv);

//Setting up different arrays for the different item types found in availableItems
const itemButtons: HTMLButtonElement[] = [];
const itemCounters: HTMLDivElement[] = [];
const itemCounts: number[] = [];

//Using the forEach() function in replace of a for loop
availableItems.forEach((item, index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `${item.name} (Cost: ${item.cost.toFixed(2)} Apples)`;
  //upgradeButton.title = item.description;
  upgradeButton.disabled = true;
  app.append(upgradeButton);
  itemButtons.push(upgradeButton);

  const counterDiv = document.createElement("div");
  app.append(counterDiv);
  itemCounters.push(counterDiv);

  //A new array which counts how many of each element we have purchased, initallized as [0,0,0]
  itemCounts.push(0);

  upgradeButton.addEventListener("click", () => purchaseItem(index));
});

//Function to help us update the click counter.
function updateClickCounter() {
  const roundedCounter = Math.round(clickCounter * 100) / 100;
  clickCounterDiv.textContent = `${roundedCounter} ${roundedCounter === 1 ? "🍎" : "🍎"}`;
  availableItems.forEach((item, index) => {
    itemButtons[index].disabled = clickCounter < item.cost;
  });
}

//Function to help us visually update the growth rate
function updateGrowthRate() {
  const roundedGrowth = Math.round(growthRate * 100) / 100;
  growthRateDiv.textContent = `Growth rate: ${roundedGrowth} ${roundedGrowth === 1 ? "🍎 per second" : "🍎 per second"}`;
}


//Iterates through the array to determine how many of each upgrade we have, stored in itemCounts
function updateItemCounters() {
  itemCounters.forEach((counter, index) => {
    counter.textContent = `${availableItems[index].name}s: ${itemCounts[index]}`;
  });
}

//Function to help us keep track of how much an upgrade will cost
function updateButtonText() {
  itemButtons.forEach((button, index) => {
    button.textContent = `${availableItems[index].name} (Cost: ${availableItems[index].cost.toFixed(2)} Apples)`;
  });
}

//A function that assists us in the purchasing of an item.
//Handles things such as cost managment, current growth rate, and inventory.
function purchaseItem(index: number) {
  if (clickCounter >= availableItems[index].cost){
    clickCounter -= availableItems[index].cost;
    growthRate += availableItems[index].rate;

    //Increments the amount of a given upgrade we have
    itemCounts[index]++;
    availableItems[index].cost = availableItems[index].cost * 1.15;

    updateClickCounter();
    updateGrowthRate();
    updateItemCounters();
    updateButtonText();
  }
}

button.addEventListener("click", () => {
  clickCounter++;
  updateClickCounter();
});

//Setting up variables for animation
//Undefined for the very first frame such that the counter can start
let prevTimestamp: number | undefined;
//const incrementPerSecond = 1;

//Function for a better counter
function betterCounter(currTimestamp: number) {
  if (prevTimestamp === undefined) {
    prevTimestamp = currTimestamp;
  }

  const elapsed = currTimestamp - prevTimestamp;
  prevTimestamp = currTimestamp;

  //Calculate fractional increase
  //Rounding the fractional increase as the continous growth was initally unwieldly to see
  const fracIncrease = (growthRate * elapsed) / 1000;
  clickCounter += fracIncrease;

  updateClickCounter();

  requestAnimationFrame(betterCounter);
}

requestAnimationFrame(betterCounter);

//Inital set up
updateClickCounter();
updateGrowthRate();
updateItemCounters();
updateButtonText();
