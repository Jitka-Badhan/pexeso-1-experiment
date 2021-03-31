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
const refreshPoints = () => {
  const pointsDiv = document.getElementById('points');
  pointsDiv.textContent = `Body: ${points}`;
};

function comparison() {
  if (compare[0].classList.value !== compare[1].classList.value) {
    // If 2 pics are different, cover them
    setTimeout( function() {
      compare[0].classList.add('cover');
      compare[1].classList.add('cover');
      compare.splice(0, 2); 
    }, 1000);
  } else {
    // If 2 pics are same, let them disappear and add a point
    points++;
    refreshPoints();
    setTimeout( function() {
      compare[0].classList.add('found');
      compare[1].classList.add('found');
      compare.splice(0, 2); 
    }, 1000);
  }
}

function init () {
  pictures.forEach(function (item) {
    // Shuffle the pictures
    item.style.order = Math.ceil(Math.random() * 10);
    // 'Cover' the pictures
    item.classList.add('cover');
    // 'Uncover'them after click and compare when there are 2 pics uncovered
    item.addEventListener('click', function () {
      item.classList.remove('cover');
      compare.push(item);
      if (compare.length === 2) {
        (compare[0].id !== compare[1].id) ? comparison() : compare.pop();
      };
    });
  })
  refreshPoints()
}

// Run the programme 
init();


