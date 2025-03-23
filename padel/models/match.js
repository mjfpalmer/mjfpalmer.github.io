function Match(index, pair1, pair2) {
  let match = this;

  this.index = index;
  this.pair1 = pair1;
  this.pair2 = pair2;

  this.pairsKey = pair1.key | pair2.key;
  this.playerKey = pair1.playerKey | pair2.playerKey;

  this.pair1Score = null;
  this.pair2Score = null;

  /*
  this.compareByPairMatches = function (match2) {
    return match.pairMatches() - match2.pairMatches();
  }

  this.pairMatches = function () {
    return match.pair1.matches + match.pair2.matches;
  }

  this.compareByPlayerMatches = function (match2) {
    return match.playerMatches() - match2.playerMatches();
  }

  this.playerMatches = function () {
    return match.pair1.player1.matches.length + match.pair1.player2.matches.length + match.pair2.player1.matches.length + match.pair2.player2.matches.length;
  }
  */

  /*
  this.minPairMatches = function () {
    return Math.min(match.pair1.matches, match.pair2.matches);
  }
  */

  this.anyPairsMatch = function (match2) {
    return match.pair1 === match2.pair1 || match.pair1 === match2.pair2 || match.pair2 === match2.pair1 || match.pair2 === match2.pair2;
  }

  this.playerInMatch = function (player) {
    return (match.playerKey & player.key) > 0;
  }
}