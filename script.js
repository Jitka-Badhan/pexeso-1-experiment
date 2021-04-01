'use strict';

// Define the variables
const pictures = [
  document.getElementById('pic1'),
  document.getElementById('pic2'),
  document.getElementById('pic3'),
  document.getElementById('pic4'),
  document.getElementById('pic5'),
  document.getElementById('pic6'),
  document.getElementById('pic7'),
  document.getElementById('pic8'),
  document.getElementById('pic9'),
  document.getElementById('pic10'),
  document.getElementById('pic11'),
  document.getElementById('pic12'),
];
let compare = [];
let points = 0;
let endPoints = 5;
let theEnd = () => {
  if (points === endPoints) {
    return true;
  }
};

// Main functions of the programme:
// Function for counting the time (stopwatch)
function count() {
  let sec = 0;
  let min = 0;

  const timeRefresh = () => {
    document.querySelector('.stopwatch').textContent = `${String(min).padStart(
      2,
      0,
    )}:${String(sec).padStart(2, 0)}`;
  };

  const countSec = setInterval(function () {
    sec < 59 ? sec++ : (sec = 0);
    timeRefresh();
    if (theEnd()) {
      clearInterval(countSec);
      clearInterval(countMin);
    }
  }, 1000);

  const countMin = setInterval(function () {
    min < 59 ? min++ : (min = 0);
    timeRefresh();
  }, 60000);
}

// Function for showing the points
function refreshPoints() {
  const pointsDiv = document.querySelector('.points');
  pointsDiv.textContent = `Body: ${points}`;
}

// Function for comparing the two pictures
function comparison() {
  if (compare[0].classList.value !== compare[1].classList.value) {
    setTimeout(function () {
      compare[0].classList.add('cover');
      compare[1].classList.add('cover');
      compare.splice(0, 2);
    }, 1000);
  } else {
    points++;
    refreshPoints();
    setTimeout(function () {
      compare[0].classList.add('found');
      compare[1].classList.add('found');
      compare.splice(0, 2);
    }, 1000);
  }
}

// Function init for reseting the game
function init() {
  pictures.forEach(function (item) {
    item.classList.remove('found');
    item.classList.add('cover');
    item.style.order = Math.ceil(Math.random() * 10);
  });
  points = 0;
  refreshPoints();
}

// Run the programme
init();

// Start counting
const playDiv = document.querySelector('.play');
playDiv.addEventListener('click', function () {
  if (playDiv.textContent === 'Hrát') {
    pictures.forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.remove('cover');
        compare.push(item);
        if (compare.length === 2) {
          compare[0].id !== compare[1].id ? comparison() : compare.pop();
        }
      });
    });
    count();
    playDiv.textContent = 'Znovu';
  } else {
    init();
    count();
  }
});
