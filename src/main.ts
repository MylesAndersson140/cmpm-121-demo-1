import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Nifty game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🍎";

//Click counter
const clickCounterDiv = document.createElement("div");
clickCounterDiv.id = "click-counter";
let clickCounter = 0;

//Function to help us update the click counter.
function updateClickCounter() {
  clickCounterDiv.textContent = `${clickCounter} ${clickCounter === 1 ? "Apple" : "Apples"}`;
}

//Adding an event listener to the button
button.addEventListener("click", () => {
  clickCounter++;
  updateClickCounter();
});

//Function to increment the counter automatically
function autoIncrement() {
  clickCounter++;
  updateClickCounter();
}

//Using the setInterval function to increment automatically
setInterval(autoIncrement, 1000); //1000 milliseconds / 1 second

//Inital set up
updateClickCounter();
app.append(button);
app.append(clickCounterDiv);
