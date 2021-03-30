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
const pointsDiv = document.getElementById('points');
let compare = [];
let points = 0;

// Propojené počítadlo:
const showPoints = () => {
  pointsDiv.textContent = `Body: ${points}`;
};
showPoints();

// Define the functions used later in global scope
function display(item) {
  if (item.cover) {
    item.style.backgroundColor = 'grey';
  } else item.style.background = null;
}

// Run the programme

pictures.forEach(function (item) {
  // Shuffle the pictures
  item.style.order = Math.ceil(Math.random() * 12);
  // 'Cover' the pictures
  item.cover = true;
  display(item);
  // 'Uncover'them after click and save for comparision
  item.addEventListener('click', function () {
    item.cover = false;
    display(item);
    compare.push(item);
    // Run the comparison
    comparison();
    console.log(points);
  });
  return pictures;
});

function comparison() {
  function cover() {
    pictures.forEach(function (item) {
      item.cover = true;
      display(item);
    });
  }
  // Start comparison when there are 2 pictures visible
  if (compare.length === 2) {
    // Compare the pictures
    if (compare[0].classList.value !== compare[1].classList.value) {
      // If they are different, log it and cover them again
      console.log('Máme jinou barvu');
      compare.splice(0, 2);
      setTimeout(function () {
        cover();
      }, 1000);
    } else {
      // If they are same, log it, let them disappear and add a point
      points++;
      showPoints();
      console.log('Máme stejnou barvu');
      compare[0].classList.add('found');
      compare[1].classList.add('found');

      // START HERE TOMORROW!
      // setTimeout(function () {
      //   compare[0].style.backgroundColor = '0';
      //   compare[1].style.backgroundColor = '0';
      // }, 1000);
      compare.splice(0, 2);
    }
  }
}
