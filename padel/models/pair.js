function Pair(index, player1, player2) {
  let pair = this;

  this.index = index;
  this.player1 = player1;
  this.player2 = player2;

  this.key = Math.pow(2, index);
  this.playerKey = this.player1.key | this.player2.key;

  this.rating = player1.rating + player2.rating;

  this.playerInPair = function (player) {
    return (pair.playerKey & player.key) > 0;
  }

  this.hasSamePlayers = function (pair2) {
    return (pair.playerKey & pair2.playerKey) > 0;
  }
}