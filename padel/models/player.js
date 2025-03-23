function Player(index) {
  let player = this;

  this.index = index;
  this.key = Math.pow(2, index);

  this.name = null;
  this.rating = index + 1;

  this.matches = [];
  this.difficulty = 0;
  this.fairness = 0;

  this.score = function () {
    return player.matches.reduce((cumulativeScore, match) => {
      if (match.pair1.playerInPair(player)) {
        return cumulativeScore + match.pair1Score || 0;
      }
      if (match.pair2.playerInPair(player)) {
        return cumulativeScore + match.pair2Score || 0;
      }
      return cumulativeScore;
    }, 0);
  }

  this.wins = function () {
    return player.matches.reduce((cumulativeWins, match) => {
      if (match.pair1.playerInPair(player)) {
        return cumulativeWins + ((match.pair1Score || 0) > (match.pair2Score || 0) ? 1 : 0);
      }
      if (match.pair2.playerInPair(player)) {
        return cumulativeWins + ((match.pair2Score || 0) > (match.pair1Score || 0) ? 1 : 0);
      }
      return cumulativeWins;
    }, 0);
  }

  this.compareByScore = function (player2) {
    return player2.score() - player.score();
  }

  this.compareByWins = function (player2) {
    return player2.wins() - player.wins();
  }
}