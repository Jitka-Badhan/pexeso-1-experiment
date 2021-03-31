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

// Main functions of the programme

function count() {
  let sec = 0;
  let min = 0;

  const timeRefresh = () => {
    document.querySelector('.stopwatch').textContent = `${String(min).padStart(
      2,
      0,
    )}:${String(sec).padStart(2, 0)}`;
  };

  const endCount = () => {
    clearInterval(countSec);
    clearInterval(countMin);
  };

  const countSec = setInterval(function () {
    sec < 59 ? sec++ : (sec = 0);
    timeRefresh();
    if (points === 5) {
      console.log('Konec!');
      endCount();
    }
  }, 1000);

  const countMin = setInterval(function () {
    min < 59 ? min++ : (min = 0);
    timeRefresh();
  }, 60000);
}

function refreshPoints() {
  const pointsDiv = document.querySelector('.points');
  pointsDiv.textContent = `Body: ${points}`;
}

function comparison() {
  if (compare[0].classList.value !== compare[1].classList.value) {
    // If 2 pics are different, cover them
    setTimeout(function () {
      compare[0].classList.add('cover');
      compare[1].classList.add('cover');
      compare.splice(0, 2);
    }, 1000);
  } else {
    // If 2 pics are same, let them disappear and add a point
    points++;
    refreshPoints();
    setTimeout(function () {
      compare[0].classList.add('found');
      compare[1].classList.add('found');
      compare.splice(0, 2);
    }, 1000);
  }
}

function init() {
  pictures.forEach(function (item) {
    item.classList.remove('found');
    item.style.order = Math.ceil(Math.random() * 10);
    item.classList.add('cover');
  });
  points = 0;
  refreshPoints();
}

function play() {
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
}

// Run the programme
init();

// Start counting
const playDiv = document.querySelector('.play');
playDiv.addEventListener('click', function () {
  if (playDiv.textContent === 'Hrát') {
    play();
    playDiv.textContent = 'Znovu';
  } else {
    init();
    play();
  }
});
