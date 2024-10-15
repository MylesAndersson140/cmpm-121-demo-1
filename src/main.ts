import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Nifty game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🍎";

//Upgrade 1 button
let appleFarmCost = 10;
const upgradeButton = document.createElement("button");
upgradeButton.textContent = `Apple Farm (Cost: ${appleFarmCost.toFixed(2)} Apples)`;
upgradeButton.disabled = true;
let appleFarmCount = 0;
const appleFarmCounterDiv = document.createElement("div");

//Upgrade 2 button
let appleOrchardCost = 100;
const upgrade2Button = document.createElement("button");
upgrade2Button.textContent = `Apple Orchard (Cost: ${appleOrchardCost.toFixed(2)} Apples)`;
upgrade2Button.disabled = true;
let appleOrchardCount = 0;
const appleOrchardCounterDiv = document.createElement("div");

//Upgrade 3 button
let appleFactoryCost = 1000;
const upgrade3Button = document.createElement("button");
upgrade3Button.textContent = `Apple Factory (Cost: ${appleFactoryCost.toFixed(2)} Apples)`;
upgrade3Button.disabled = true;
let appleFactoryCount = 0;
const appleFactoryCounterDiv = document.createElement("div");

//Click counter
const clickCounterDiv = document.createElement("div");
clickCounterDiv.id = "click-counter";
let clickCounter = 0;

//Growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
let growthRate = 0;

//Setting up variables for animation
//Undefined for the very first frame such that the counter can start
let prevTimestamp: number | undefined;
//const incrementPerSecond = 1;

//Function to help us update the click counter.
function updateClickCounter() {
  const roundedCounter = Math.round(clickCounter * 100) / 100;
  clickCounterDiv.textContent = `${roundedCounter} ${roundedCounter === 1 ? "Apple" : "Apples"}`;
  upgradeButton.disabled = clickCounter < appleFarmCost;
  upgrade2Button.disabled = clickCounter < appleOrchardCost;
  upgrade3Button.disabled = clickCounter < appleFactoryCost;
}

//Function to help us visually update the growth rate
function updateGrowthRate() {
  const roundedGrowth = Math.round(growthRate * 100) / 100;
  growthRateDiv.textContent = `Growth rate: ${roundedGrowth} ${roundedGrowth === 1 ? "apple per second" : "apples per second"}`;
}

//Function to help us keep track of how much an upgrade will cost
function updateUpgradeText() {
  upgradeButton.textContent = `Apple Farm (Cost: ${appleFarmCost.toFixed(2)} Apples)`;
  upgrade2Button.textContent = `Apple Orchard (Cost: ${appleOrchardCost.toFixed(2)} Apples)`;
  upgrade3Button.textContent = `Apple Factory (Cost: ${appleFactoryCost.toFixed(2)} Apples)`;
}

//Adding an event listener to the button
button.addEventListener("click", () => {
  clickCounter++;
  updateClickCounter();
});

//Adding an event listener to the upgrade button
upgradeButton.addEventListener("click", () => {
  if (clickCounter >= appleFarmCost) {
    clickCounter -= appleFarmCost;
    //Adding 0.1 to the growth rate
    growthRate += 0.1;
    appleFarmCount++;
    appleFarmCost = appleFarmCost * 1.15;
    updateClickCounter();
    updateGrowthRate();
    updateUpgradeCounters();
    updateUpgradeText();
  }
});

//Adding an event listener to the upgrade button
upgrade2Button.addEventListener("click", () => {
  if (clickCounter >= appleOrchardCost) {
    clickCounter -= appleOrchardCost;
    //Adding 2 to the growth rate
    growthRate += 2;
    appleOrchardCount++;
    appleOrchardCost = appleOrchardCost * 1.15;
    updateClickCounter();
    updateGrowthRate();
    updateUpgradeCounters();
    updateUpgradeText();
  }
});

//Adding an event listener to the upgrade button
upgrade3Button.addEventListener("click", () => {
  if (clickCounter >= appleFactoryCost) {
    clickCounter -= appleFactoryCost;
    //Adding 50 to the growth rate
    growthRate += 50;
    appleFactoryCount++;
    appleFactoryCost = appleFactoryCost * 1.15;
    updateClickCounter();
    updateGrowthRate();
    updateUpgradeCounters();
    updateUpgradeText();
  }
});

function updateUpgradeCounters() {
  appleFarmCounterDiv.textContent = `Apple Farms: ${appleFarmCount}`;
  appleOrchardCounterDiv.textContent = `Apple Orchards: ${appleOrchardCount}`;
  appleFactoryCounterDiv.textContent = `Apple Factories: ${appleFactoryCount}`;
}

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
app.append(button);
app.append(upgradeButton);
app.append(upgrade2Button);
app.append(upgrade3Button);
app.append(clickCounterDiv);
app.append(growthRateDiv);
app.append(appleFarmCounterDiv);
app.append(appleOrchardCounterDiv);
app.append(appleFactoryCounterDiv);

updateClickCounter();
updateGrowthRate();
updateUpgradeCounters();
