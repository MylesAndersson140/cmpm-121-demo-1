import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Nifty game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🍎";

//Upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Apple Farm (Cost: 10 Apples)";
upgradeButton.disabled = true;

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
  clickCounterDiv.textContent = `${clickCounter} ${clickCounter === 1 ? "Apple" : "Apples"}`;
  upgradeButton.disabled = clickCounter < 10;
}

//Adding an event listener to the button
button.addEventListener("click", () => {
  clickCounter++;
  updateClickCounter();
});


//Adding an event listener to the upgrade button
upgradeButton.addEventListener("click", () => {
    if (clickCounter >= 10) {
      clickCounter = Math.round((clickCounter - 10) * 100) / 100;
      //Adding 1 to the growth rate
      growthRate = Math.round((growthRate + 1) * 100) / 100;
      updateClickCounter();
    }
  });


//Function for a better counter
function betterCounter(currTimestamp: number) {
  if (prevTimestamp === undefined) {
    prevTimestamp = currTimestamp;
  }

  const elapsed = currTimestamp - prevTimestamp;
  prevTimestamp = currTimestamp;

  //Calculate fractional increase
  //Rounding the fractional increase as the continous growth was initally unwieldly to see
  const fracIncrease = Math.round((growthRate * elapsed / 1000) * 100) / 100;
  clickCounter = Math.round((clickCounter + fracIncrease) * 100) / 100;

  updateClickCounter();

  requestAnimationFrame(betterCounter);
}

requestAnimationFrame(betterCounter);

//Inital set up
app.append(button);
app.append(upgradeButton);
app.append(clickCounterDiv);
app.append(growthRateDiv);
