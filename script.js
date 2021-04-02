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
  document.getElementById('pic13'),
  document.getElementById('pic14'),
  document.getElementById('pic15'),
  document.getElementById('pic16'),
  document.getElementById('pic17'),
  document.getElementById('pic18'),
  document.getElementById('pic19'),
  document.getElementById('pic20'),
  document.getElementById('pic21'),
  document.getElementById('pic22'),
  document.getElementById('pic23'),
  document.getElementById('pic24'),
  document.getElementById('pic25'),
  document.getElementById('pic26'),
  document.getElementById('pic27'),
  document.getElementById('pic28'),
  document.getElementById('pic29'),
  document.getElementById('pic30'),
  document.getElementById('pic31'),
  document.getElementById('pic32'),
  document.getElementById('pic33'),
  document.getElementById('pic34'),
  document.getElementById('pic35'),
  document.getElementById('pic36'),
];
let compare = [];
let points = 0;
let endPoints = 5;
let stopCount = false;
let theEnd = () => {
  if (points === endPoints) {
    playDiv.textContent = 'Znovu';
    return true;
  } else if (stopCount) {
    playDiv.textContent = 'Znovu';
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
      stopCount = false;
    }
  }, 1000);

  const countMin = setInterval(function () {
    min < 59 ? min++ : (min = 0);
    timeRefresh();
  }, 60000);

  const countEnd = setInterval(function () {
    if (theEnd()) {
      clearInterval(countSec);
      clearInterval(countMin);
      stopCount = false;
    }
  }, 10);
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
    playDiv.textContent = 'Stop';
  } else if (playDiv.textContent === 'Stop') {
    stopCount = true;
  } else {
    init();
    count();
    playDiv.textContent = 'Stop';
  }
});

const mediaQuery = window.matchMedia('(min-width: 360px');
if (mediaQuery.matches) {
  document.querySelector('#pic11').style.display = 'block';
  document.querySelector('#pic12').style.display = 'block';
}

// Set the amount of cards
const difficultyLevel = document.querySelector('.difficulty_menu_icon');
difficultyLevel.addEventListener('click', function () {
  document.querySelector('.difficulty_menu_hidden').classList.toggle('show');
});
const cards_amount12 = document.querySelector('.level12');
const cards_amount18 = document.querySelector('.level18');
const cards_amount24 = document.querySelector('.level24');
const cards_amount36 = document.querySelector('.level36');

cards_amount12.addEventListener('click', function () {
  stopCount = true;
  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 12) {
      item.classList.remove('show');
    }

    const mediaQuery = window.matchMedia('(min-width: 720px');
    if (mediaQuery.matches) {
      const container = document.querySelector('.container');
      container.style.maxWidth = '360px';
      container.style.minWidth = '360px';
      container.style.margin = '0';
    }

    document.querySelector('.difficulty_menu_hidden').classList.remove('show');
    endPoints = 6;
    theEnd();
    document.querySelector('.stopwatch').textContent = '00:00';
    init();
  });
});

cards_amount18.addEventListener('click', function () {
  stopCount = true;
  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 18) {
      item.classList.remove('show');
    }

    const mediaQuery = window.matchMedia('(min-width: 720px');
    if (mediaQuery.matches) {
      const container = document.querySelector('.container');
      container.style.maxWidth = '540px';
      container.style.minWidth = '540px';
      container.style.margin = '0';
    }

    document.querySelector('.difficulty_menu_hidden').classList.remove('show');
    endPoints = 9;
    theEnd();
    document.querySelector('.stopwatch').textContent = '00:00';
    init();
  });
});

cards_amount24.addEventListener('click', function () {
  stopCount = true;
  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 24) {
      item.classList.remove('show');
    }

    const mediaQuery = window.matchMedia('(min-width: 720px');
    if (mediaQuery.matches) {
      const container = document.querySelector('.container');
      container.style.maxWidth = '720px';
      container.style.minWidth = '720px';
      container.style.margin = '0';
    }

    document.querySelector('.difficulty_menu_hidden').classList.remove('show');
    endPoints = 12;
    theEnd();
    document.querySelector('.stopwatch').textContent = '00:00';
    init();
  });
});

cards_amount36.addEventListener('click', function () {
  stopCount = true;
  pictures.forEach(function (item) {
    item.classList.add('show');

    const mediaQuery = window.matchMedia('(min-width: 720px');
    if (mediaQuery.matches) {
      const container = document.querySelector('.container');
      container.style.maxWidth = '820px';
      container.style.minWidth = '820px';
      container.style.margin = '0';
    }

    document.querySelector('.difficulty_menu_hidden').classList.remove('show');
    endPoints = 18;
    theEnd();
    document.querySelector('.stopwatch').textContent = '00:00';
    init();
  });
});

// Set the number of players
const players = document.querySelector('.players_menu_icon');
players.addEventListener('click', function () {
  document.querySelector('.players_menu_hidden').classList.toggle('show');
});
