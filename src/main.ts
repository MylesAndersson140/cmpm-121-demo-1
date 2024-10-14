import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My nifty game!!";
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
updateClickCounter();

//Function to help us update the click counter.
function updateClickCounter(){
    clickCounterDiv.textContent = `${clickCounter} ${clickCounter === 1 ? 'Apple' : 'Apples'}`;
}

//Adding an event listener to the button
button.addEventListener("click", () => {
    clickCounter++;
    updateClickCounter();
  });


app.append(button);
app.append(clickCounterDiv);
