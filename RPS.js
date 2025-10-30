const score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
  };

updateScoreElement();

// if (score === null) {
//   score = {
//     wins:0,
//     losses:0,
//     ties:0
//   }
// }

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  } else if(event.key === 'a') {
    autoPlay();
  } else if(event.key === 'Backspace') {
    resetScoresConfirm();
  }
});

const rockPlay = document.querySelector('.js-rock-play');

rockPlay.addEventListener('click', () => {
  playGame('rock');
})

const paperPlay = document.querySelector('.js-paper-play');

paperPlay.addEventListener('click', () => {
  playGame('paper');
})

const scissorsPlay = document.querySelector('.js-scissors-play');

scissorsPlay.addEventListener('click', () => {
  playGame('scissors');
})


const autoPlayElement = document.querySelector('.js-auto-play');

autoPlayElement.addEventListener('click', () => {
  autoPlay()
});

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000)
    autoPlayElement.innerText = 'Stop Autoplay'
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayElement.innerText = 'Auto Play'
    isAutoPlaying = false;
  }
}

function playGame (playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if(computerMove === 'rock') {
      result='You lose.';
    }
    else if (computerMove === 'paper') {
      result='You win.';
    }
    else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  else if (playerMove === 'rock') {
    if(computerMove === 'rock') {
      result='Tie.';
    }
    else if (computerMove === 'paper') {
      result='You lose.';
    }
    else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  else if (playerMove === 'paper') {
    if(computerMove === 'rock') {
      result='You win.';
    }
    else if (computerMove === 'paper') {
      result='Tie.';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }


  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img class="move-img" src="/images/${playerMove}-emoji.png" alt="img"> <img class="move-img" src="/images/${computerMove}-emoji.png"> Computer`;
}

function updateScoreElement () {
  document.querySelector('.js-score') 
    .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`; 
}

// function resultElement () {
//   document.querySelector('.js-result').innerHTML = result;
// }

function pickComputerMove () {
  let computerMove='';
  const randomNumber = Math.random();
  
  if (randomNumber >=0 && randomNumber<1/3) {
    computerMove ='rock';
  } else if (randomNumber >=1/3 && randomNumber<2/3) {
    computerMove ='paper';
  } else if (randomNumber >=2/3 && randomNumber<1) {
    computerMove ='scissors';
  }
  
  return computerMove;
}


const resetScoresConfirm = () => {
  document.querySelector('.js-reset-score-confirm').innerHTML = '<p class="display-confirm-msg">Are you sure you want to reset the score? <button class="confirmation-yes">Yes</button> <button class="confirmation-No">No</button></p>';

  const confirmButtonYes = document.querySelector('.confirmation-yes');
  const confirmButtonNo = document.querySelector('.confirmation-No');

  confirmButtonYes.addEventListener('click', resetScores);

  confirmButtonNo.addEventListener('click', () => {
    setTimeout(() => {
      document.querySelector('.js-reset-score-confirm').innerHTML = null;
    },0)
  } );
};


const resetButtonElement = document.querySelector('.js-reset-button');
resetButtonElement.addEventListener('click', resetScoresConfirm);


function resetScores() {
  score.wins=0;
  score.losses=0;
  score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = null;
  document.querySelector('.js-moves').innerHTML =null;
  setTimeout(() => {
    document.querySelector('.js-reset-score-confirm').innerHTML = null;
  },0)
}

