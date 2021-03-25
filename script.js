'use strict';

// Define the variables
let pictures = [];
let compare = [];
let points = 0;

// 'Connect' these variables with the objects on the website
const pic1 = document.getElementById('pic1');
const pic2 = document.getElementById('pic2');
const pic3 = document.getElementById('pic3');
const pic4 = document.getElementById('pic4');
const pic5 = document.getElementById('pic5');
const pic6 = document.getElementById('pic6');
const pic7 = document.getElementById('pic7');
const pic8 = document.getElementById('pic8');
const pic9 = document.getElementById('pic9');
const pic10 = document.getElementById('pic10');
const pic11 = document.getElementById('pic11');
const pic12 = document.getElementById('pic12');

// Insert the variables of pictures in the predefined array
pictures = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
  pic11,
  pic12,
];

pictures.forEach(function (item) {
  // Shuffle the pictures
  item.style.order = Math.ceil(Math.random() * 12);
  // Define the functions used later
  function display() {
    if (item.cover === true) {
      item.style.backgroundColor = 'grey';
    } else item.style.background = null;
  }
  // 'Cover' the pictures
  item.cover = true;
  display();
  // 'Uncover'them after click and save for comparision
  item.addEventListener('click', function () {
    item.cover = false;
    display();
    compare.push(item);
    // Run the comparison
    comparison();
  });
  return pictures;
});

function comparison() {
  // Define the function used later
  function cover() {
    pictures.forEach(function (item) {
      item.cover = true;
      function display() {
        if (item.cover === true) {
          item.style.backgroundColor = 'grey';
        } else item.style.background = null;
      }
      display();
    });
  }
  // Start comparison when there are 2 pictures visible
  if (compare.length === 2) {
    // Compare the pictures
    if (compare[0].classList.value === compare[1].classList.value) {
      // If they are same, log it and cover them again
      console.log('Máme stejnou barvu');
      compare.splice(0, 2);
      setTimeout(function () {
        cover();
      }, 1000);
      // If they are different, log it and cover them again
    } else {
      console.log('Máme jinou barvu');
      compare.splice(0, 2);
      setTimeout(function () {
        cover();
      }, 1000);
    }
  }
}
