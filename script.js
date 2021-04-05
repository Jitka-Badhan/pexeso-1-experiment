'use strict';

// 1. Define the variables
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
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
let endPoints = 5;
let stopButton = false;

// 2. Main functions of the programme:

// Function init for setting and reseting the game
function init() {
  pictures.forEach(function (item) {
    item.classList.remove('found');
    item.classList.add('cover');
    item.style.order = Math.ceil(Math.random() * 10);
  });
  points = 0;
  refreshPoints();
  document.querySelector('.stopwatch').textContent = '00:00';
  stopButton = false;
}

// Function alterating the players in multiplayer
const changePlayers = () => {
  if (playDiv.classList.contains('player1_turn')) {
    playDiv.classList.remove('player1_turn');
    playDiv.classList.add('player2_turn');
    player1_icon.classList.remove('show');
    player2_icon.classList.add('show');
    body.classList.remove('player1_bckgr');
    body.classList.add('player2_bckgr');
  } else if (playDiv.classList.contains('player2_turn')) {
    playDiv.classList.remove('player2_turn');
    playDiv.classList.add('player1_turn');
    player2_icon.classList.remove('show');
    player1_icon.classList.add('show');
    body.classList.remove('player2_bckgr');
    body.classList.add('player1_bckgr');
  }
};

// Functions determining the process of the game in the arrays of pictures:
const startPlay = () => {
  pictures.forEach((item) =>
    item.addEventListener('click', function () {
      item.classList.remove('cover');
      compare.push(item);
      if (compare.length === 2) {
        compare[0].id !== compare[1].id ? comparison() : compare.pop();
      }
    }),
  );
};

const stopPlay = () => {
  pictures.forEach((item) => (item.style.pointerEvents = 'none'));

  if (playDiv.classList.contains('multiplayer')) {
    init();
    initMultiplayer();
  }
};

const restartPlay = () => {
  pictures.forEach((item) => (item.style.pointerEvents = 'all'));
  init();
};

// Function for comparing the two pictures
function comparison() {
  if (compare[0].classList.value !== compare[1].classList.value) {
    setTimeout(function () {
      compare[0].classList.add('cover');
      compare[1].classList.add('cover');
      compare.splice(0, 2);
    }, 1000);
    if (playDiv.classList.contains('multiplayer')) {
      setTimeout(function () {
        changePlayers();
      }, 1000);
    }
  } else {
    points++;
    refreshPoints();
    setTimeout(function () {
      compare[0].classList.add('found');
      compare[1].classList.add('found');
      compare.splice(0, 2);
    }, 1000);
    if (playDiv.classList.contains('multiplayer')) {
      if (playDiv.classList.contains('player1_turn')) {
        pointsPlayer1++;
        setTimeout(function () {
          document.querySelector(
            '.player1',
          ).innerHTML = `Hráč 1<br />Body: ${pointsPlayer1}`;
        }, 1000);
      } else if (playDiv.classList.contains('player2_turn')) {
        pointsPlayer2++;
        setTimeout(function () {
          document.querySelector(
            '.player2',
          ).innerHTML = `Hráč 2<br />Body: ${pointsPlayer2}`;
        }, 1000);
      }
    }
  }
}

// Functions determining the end of the game
let theEnd = () => {
  if (points === endPoints || stopButton) {
    playDivText.textContent = 'Hrát';
    return true;
  }
};

const endAlert = () => {
  const endResult = document.querySelector('.endResult');
  const endText = document.querySelector('.endText');
  const closeButton = document.querySelector('.closeButton');

  const popEndAlert = () => {
    endResult.classList.add('showFlex');
    closeButton.addEventListener('click', function close() {
      endResult.classList.remove('showFlex');
      closeButton.removeEventListener('click', close);
    });
  };

  if (points === endPoints) {
    if (!playDiv.classList.contains('multiplayer')) {
      popEndAlert();
      playDivText.textContent = 'Znovu';
      endText.innerHTML = `Vyhrál/a jsi v čase <strong>${
        document.querySelector('.stopwatch').textContent
      }</strong>.`;
    } else if (
      playDiv.classList.contains('multiplayer') &&
      pointsPlayer1 > pointsPlayer2
    ) {
      popEndAlert();
      playDivText.textContent = 'Znovu';
      endText.innerHTML = `Vyhrál <strong style="color: #4caf50;">hráč 1</strong>.`;
    } else if (
      playDiv.classList.contains('multiplayer') &&
      pointsPlayer2 > pointsPlayer1
    ) {
      popEndAlert();
      playDivText.textContent = 'Znovu';
      endText.innerHTML = `Vyhrál <strong style="color: #2196f3;">hráč 2</strong>.`;
    } else if (
      playDiv.classList.contains('multiplayer') &&
      pointsPlayer1 === pointsPlayer2
    ) {
      popEndAlert();
      playDivText.textContent = 'Znovu';
      endText.innerHTML = `Oba hráči měli <strong>stejně bodů</strong>.`;
    } else {
      console.log('Chyba ve vyhodnocení konečného výsledku hry.');
    }
  }
};

// Function for counting the time (stopwatch), ends if theEnd() returns true

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
  }, 1000);

  const countMin = setInterval(function () {
    min < 59 ? min++ : (min = 0);
    timeRefresh();
  }, 60000);

  const countEnd = setInterval(function () {
    if (theEnd()) {
      clearInterval(countSec);
      clearInterval(countMin);
      clearInterval(countEnd);
      endAlert();
    }
  }, 10);
}

// Function for showing the points
const refreshPoints = () => {
  const pointsDiv = document.querySelector('.points');
  pointsDiv.textContent = `Body: ${points}`;
};

// Function for early ending the game (used with pressing any of the menu buttons)
const earlyEnd = () => {
  if (
    playDiv.classList.contains('active') &&
    !playDiv.classList.contains('paused')
  ) {
    playDiv.classList.add('paused');
    stopPlay();
  }
  playDivText.textContent = 'Hrát';
};

// 3. Run the programme
// a. mixing the cards, resetting the game interface
init();

// b. handling the events of the game by the start button:
const playDiv = document.querySelector('.play');
const playDivText = document.querySelector('.play p');
playDiv.addEventListener('click', function singlePlayerGame() {
  if (!playDiv.classList.contains('active')) {
    startPlay();
    count();
    playDivText.textContent = 'Stop';
    playDiv.classList.add('active');
  } else if (playDiv.classList.contains('paused')) {
    restartPlay();
    count();
    playDivText.textContent = 'Stop';
    playDiv.classList.remove('paused');
  } else {
    stopButton = true;
    theEnd();
    stopPlay();
    playDivText.textContent = 'Hrát';
    playDiv.classList.add('paused');
  }
});

///////////////////////////////////////////////////////////////////////////
// 4. Difficulty levels & Media Queries (cards layout)

const mediaQuery = window.matchMedia('(min-width: 360px');

if (mediaQuery.matches) {
  document.querySelector('#pic11').style.display = 'block';
  document.querySelector('#pic12').style.display = 'block';
  endPoints = 6;
  theEnd();
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
  earlyEnd();

  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 12) {
      item.classList.remove('show');
    }
  });

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
  init();
  stopButton = true;

  if (playDiv.classList.contains('multiplayer')) {
    initMultiplayer();
  }
});

cards_amount18.addEventListener('click', function () {
  earlyEnd();

  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 18) {
      item.classList.remove('show');
    }
  });

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
  init();
  stopButton = true;

  if (playDiv.classList.contains('multiplayer')) {
    initMultiplayer();
  }
});

cards_amount24.addEventListener('click', function () {
  earlyEnd();

  pictures.forEach(function (item, index) {
    item.classList.add('show');
    if (index >= 24) {
      item.classList.remove('show');
    }
  });

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
  init();
  stopButton = true;

  if (playDiv.classList.contains('multiplayer')) {
    initMultiplayer();
  }
});

cards_amount36.addEventListener('click', function () {
  earlyEnd();

  pictures.forEach(function (item) {
    item.classList.add('show');
  });

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
  init();
  stopButton = true;

  if (playDiv.classList.contains('multiplayer')) {
    initMultiplayer();
  }
});

///////////////////////////////////////////////////////////////////////////
// 5. Multiplayer

// Set the number of players
const players = document.querySelector('.players_menu_icon');
players.addEventListener('click', function () {
  document.querySelector('.players_menu_hidden').classList.toggle('show');
});

const singlePlayer = document.querySelector('.singlePlayer');
const multiplayer = document.querySelector('.multiplayer');

const body = document.querySelector('body');
const player1_icon = document.querySelector('.player1_icon');
const player2_icon = document.querySelector('.player2_icon');

const initMultiplayer = () => {
  document.querySelector('.stopwatch').style.display = 'none';
  document.querySelector('.points').style.display = 'none';
  document.querySelector('.player1').style.display = 'block';
  document.querySelector('.player2').style.display = 'block';
  document.querySelector('.players_menu_hidden').classList.remove('show');
  body.classList.remove('player1_bckgr');
  body.classList.remove('player2_bckgr');
  body.classList.add('multiplayer_bckgr');
  playDiv.style.backgroundColor = '#ffc107';
  player1_icon.classList.add('show');
  player2_icon.classList.add('show');
  pointsPlayer1 = 0;
  document.querySelector(
    '.player1',
  ).innerHTML = `Hráč 1<br />Body: ${pointsPlayer1}`;
  pointsPlayer2 = 0;
  document.querySelector(
    '.player2',
  ).innerHTML = `Hráč 1<br />Body: ${pointsPlayer2}`;

  playDiv.classList.remove('multiplayer_active');
  playDiv.classList.add('multiplayer');

  playDiv.addEventListener('click', function multiplayerGame() {
    if (!playDiv.classList.contains('multiplayer_active')) {
      player2_icon.classList.remove('show');
      body.classList.add('player1_bckgr');
      playDiv.classList.add('multiplayer_active');
      playDiv.classList.add('player1_turn');
    }
    playDiv.removeEventListener('click', multiplayerGame);
  });
};

singlePlayer.addEventListener('click', function () {
  earlyEnd();
  init();
  stopButton = true;

  document.querySelector('.stopwatch').style.display = 'block';
  document.querySelector('.points').style.display = 'block';
  document.querySelector('.player1').style.display = 'none';
  document.querySelector('.player2').style.display = 'none';
  document.querySelector('.players_menu_hidden').classList.remove('show');
  playDiv.style.backgroundColor = '#e91e63';
  playDiv.classList.remove('multiplayer');
  playDiv.classList.remove('multiplayer_active');
  playDiv.classList.remove('player1_turn');
  playDiv.classList.remove('player2_turn');
  player1_icon.classList.remove('show');
  player2_icon.classList.remove('show');
  body.classList.remove('player1_bckgr');
  body.classList.remove('player2_bckgr');
  body.classList.remove('player2_bckgr');
  body.classList.remove('multiplayer_bckgr');
  body.classList.add('singlePlayer_bckgr');
  console.log(body);
});

multiplayer.addEventListener('click', function () {
  body.classList.remove('singlePlayer_bckgr');

  earlyEnd();
  init();
  initMultiplayer();
  stopButton = true;
});
