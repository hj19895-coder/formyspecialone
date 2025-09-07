let highestZ = 1; // Keeps track of stacking order

document.querySelectorAll(".paper").forEach(paper => {
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  // Mouse down / touch start
  const startDrag = (e) => {
    isDragging = true;
    paper.style.zIndex = highestZ++;
    let rect = paper.getBoundingClientRect();

    if (e.type === "mousedown") {
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    } else if (e.type === "touchstart") {
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    }

    e.preventDefault();
  };

  // Mouse move / touch move
  const duringDrag = (e) => {
    if (!isDragging) return;

    let x, y;
    if (e.type === "mousemove") {
      x = e.clientX;
      y = e.clientY;
    } else if (e.type === "touchmove") {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    paper.style.left = (x - offsetX) + "px";
    paper.style.top = (y - offsetY) + "px";
  };

  // Mouse up / touch end
  const stopDrag = () => {
    isDragging = false;
  };

  // Event listeners
  paper.addEventListener("mousedown", startDrag);
  paper.addEventListener("touchstart", startDrag);

  document.addEventListener("mousemove", duringDrag);
  document.addEventListener("touchmove", duringDrag);

  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
});


// Timer code outside the Paper class
var startDate = new Date('2023-08-01T00:00:00'); // Change to your date

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  const timerEl = document.getElementById('timer');
  if (timerEl) {
    timerEl.textContent =
      `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}

setInterval(updateTimer, 1000);
updateTimer();
