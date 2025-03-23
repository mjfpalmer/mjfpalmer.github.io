function Tournament(players, pairs, matches, matchesPerRound) {
  let tournament = this;

  this.playerCount = players.length;

  this.players = players;
  this.pairs = pairs;
  this.matches = matches;
  this.rounds = [];

  this.playerDifficulty = players.map(p => 0);

  let round;
  for (let iMatch = 0; iMatch < matches.length; iMatch++) {
    let match = matches[iMatch];

    if (iMatch % matchesPerRound === 0) {
      round = new Round(tournament.rounds.length);
      tournament.rounds.push(round);
    }
    round.matches.push(match);

    tournament.playerDifficulty[match.pair1.player1.index] += match.pair2.rating;
    tournament.playerDifficulty[match.pair1.player2.index] += match.pair2.rating;
    tournament.playerDifficulty[match.pair2.player1.index] += match.pair1.rating;
    tournament.playerDifficulty[match.pair2.player2.index] += match.pair1.rating;
  }

  this.totalDifficulty = this.playerDifficulty.reduce((cumulativeDifficulty, difficulty) => cumulativeDifficulty + difficulty, 0);
  this.averageDifficulty = this.totalDifficulty / this.playerCount;
  this.fairness = this.playerDifficulty.reduce((cumulativeFairness, difficulty) => cumulativeFairness + Math.abs(this.averageDifficulty - difficulty), 0);

  this.initialise = function () {
    for (let player of tournament.players) {
      player.matches = tournament.matches.filter(m => m.playerInMatch(player));
    }
  }

  this.compareByFairness = function (tournament2) {
    return tournament.fairness - tournament2.fairness;
  }
}