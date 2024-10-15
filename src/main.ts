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
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Apple Farm (Cost: 10 Apples)";
upgradeButton.disabled = true;
let appleFarmCount = 0;
const appleFarmCounterDiv = document.createElement("div");

//Upgrade 2 button
const upgrade2Button = document.createElement("button");
upgrade2Button.textContent = "Apple Orchard (Cost: 100 Apples)";
upgrade2Button.disabled = true;
let appleOrchardCount = 0;
const appleOrchardCounterDiv = document.createElement("div");

//Upgrade 3 button
const upgrade3Button = document.createElement("button");
upgrade3Button.textContent = "Apple Factory (Cost: 1000 Apples)";
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
  upgradeButton.disabled = clickCounter < 10;
  upgrade2Button.disabled = clickCounter < 100;
  upgrade3Button.disabled = clickCounter < 1000;
}

//Function to help us visually update the growth rate
function updateGrowthRate() {
    const roundedGrowth = Math.round(growthRate * 100) / 100;
    growthRateDiv.textContent = `Growth rate: ${roundedGrowth} ${roundedGrowth === 1 ? "apple per second" : "apples per second"}`;
}

//Adding an event listener to the button
button.addEventListener("click", () => {
  clickCounter++;
  updateClickCounter();
});

//Adding an event listener to the upgrade button
upgradeButton.addEventListener("click", () => {
  if (clickCounter >= 10) {
    clickCounter -= 10;
    //Adding 0.1 to the growth rate
    growthRate += 0.1;
    appleFarmCount++;
    updateClickCounter();
    updateGrowthRate();
    updateUpgradeCounters();
  }
});

//Adding an event listener to the upgrade button
upgrade2Button.addEventListener("click", () => {
    if (clickCounter >= 100) {
      clickCounter -= 100
      //Adding 2 to the growth rate
      growthRate += 2;
      appleOrchardCount++;
      updateClickCounter();
      updateGrowthRate();
      updateUpgradeCounters();
    }
});

//Adding an event listener to the upgrade button
upgrade3Button.addEventListener("click", () => {
    if (clickCounter >= 1000) {
        clickCounter -= 1000;
        //Adding 50 to the growth rate
        growthRate += 50;
        appleFactoryCount++;
        updateClickCounter();
        updateGrowthRate();
        updateUpgradeCounters();
    }
});

function updateUpgradeCounters(){
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