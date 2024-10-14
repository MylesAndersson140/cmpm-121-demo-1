import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My nifty game!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = "🍎";
button.addEventListener("click", () => {
  //something happens when clicked!
});

app.append(button);