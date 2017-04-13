function newGame(){
  return new Game();
};

function generateWinningNumber(){
  return (Math.floor(Math.random() * 100) + 1);
}

function shuffle(array){
  //console.log("array = " + array);
  // returns a random number between 0 - (array.length - 1)
  var rand = (Math.floor(Math.random() * 100)) % array.length;
  //console.log("rand = " + rand);
  var ele = array.splice(rand - 1, 1);
  //console.log("ele = " + ele);
  //console.log("array = " + array);
  array.push(ele[0])
  //console.log("array2 = " + array);
  return array;
}

// function shuffle(array){
//   for (var i = 0; i < array.length; i++){
//     var randIndex = (Math.floor(Math.random() * 100)) % array.length;
//     var temp = array[i];
//     array[i] = array[randIndex];
//     array[randIndex] = temp;
//   }
//   return array;
// }

console.log(shuffle([20, 50, 70]));

//========Game Class==============
function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
  return (this.playersGuess < this.winningNumber);
}

Game.prototype.playersGuessSubmission = function(guess){
  if (typeof guess !== 'number' || guess <= 0 || guess > 100){
    throw "That is an invalid guess.";
  } else{
    this.playersGuess = guess;
    return this.checkGuess(guess);
  }
}

Game.prototype.checkGuess = function(guess){
  if (guess === this.winningNumber){
    return "You Win!";
  }else if (this.pastGuesses.length === 4){
    // 4 wrong answers already, fifth wrong answer returns 'You Lose'
    return "You Lose.";
  }else {
    // check if the guess was already existed in the pastGuesses array
    if(this.pastGuesses.indexOf(guess) !== -1){
      return "You have already guessed that number.";
    }else{
      this.pastGuesses.push(guess);
    }

    if (this.difference() < 10){
      return "You\'re burning up!";
    }else if (this.difference() < 25){
      return "You\'re lukewarm.";
    }else if (this.difference() < 50){
      return "You\'re a bit chilly.";
    }else{
      return "You\'re ice cold!";
    }
  }
}

Game.prototype.provideHint = function(){
  var hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  console.log(hints);
  return shuffle(hints);
}

var game = new Game();
game.provideHint();


//========================jquery================================================

$(document).ready(function() {
    $('#submit').click(function(e) {
       console.log('Submit button has been clicked')
    })
})
