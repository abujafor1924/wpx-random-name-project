let names = [];
const colors = [
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#FFC300",
  "#DAF7A6",
  "#FF5733",
  "#C70039",
];

const canvas = document.getElementById("canvas");
const text = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;
let sliceAngle = (Math.PI * 2) / names.length;

function drawWheel() {
  text.clearRect(0, 0, canvas.width, canvas.height);
  sliceAngle = (Math.PI * 2) / names.length;

  for (let i = 0; i < names.length; i++) {
    const angle = i * sliceAngle;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    text.beginPath();
    text.arc(centerX, centerY, radius, angle, angle + sliceAngle);
    text.lineTo(centerX, centerY);
    text.fillStyle = colors[i];
    text.fill();

    text.save();
    text.translate(x, y);
    text.rotate(angle + sliceAngle / 2 + Math.PI / 2);
    text.textAlign = "left";
    text.fillStyle = "white";
    text.font = "20px Arial";
    text.fillText(names[i], 40, 10);
    text.restore();
  }
}

function addName() {
  const inputName = document.getElementById("inputName").value;
  if (inputName) {
    names.push(inputName);
    drawWheel();
    renderNameList();
    document.getElementById("inputName").value = "";
  }
}

function renderNameList() {
  const nameList = document.getElementById("nameList");
  nameList.innerHTML = "";
  names.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    nameList.appendChild(li);
  });
}

function spinWheel() {
  if (names.length < 1) {
    alert("Please add some names to the wheel!");
    return;
  }
  let spins = 8; // Number of spins
  let spinAngleStart = Math.random() * Math.PI * 2;
  let spinTime = 0;
  let spinTimeTotal = Math.random() * 3 + 4 * 1000;

  const rotateWheel = () => {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    let spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    drawWheel();
    text.save();
    text.translate(centerX, centerY);
    text.rotate(spinAngle);
    text.translate(-centerX, -centerY);
    drawWheel();
    text.restore();
    requestAnimationFrame(rotateWheel);
  };

  const stopRotateWheel = () => {
    let winningIndex = Math.floor(
      (spinAngleStart % (Math.PI * 2)) / sliceAngle
    );
    let stopAngle = sliceAngle * winningIndex;
    text.save();
    text.translate(centerX, centerY);
    text.rotate(-stopAngle);
    text.translate(-centerX, -centerY);
    drawWheel();
    text.restore();
    document.getElementById("winnerName").innerText = names[winningIndex];
  };

  rotateWheel();
}

function easeOut(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

drawWheel();
