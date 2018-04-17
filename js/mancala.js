var manBoard = {
	template: `
		<div class="mancala__board">
			<h2 class="sr-only">Board</h2>
			<p>Winner: {{ winner }}</p>
			<p>Turn: {{ turn }}</p>

			<div class="mancala__holes">
				<div class="mancala__hole" v-for="(hole, index) in holes" :class="hole.cssClasses">
					
					<div class="mancala__stones" @click="playTurn(hole, index)">
						<p style="color: white;">{{ index }}</p>
						<div class="mancala__stone" v-for="stone in hole.stones"></div>
					</div>
				</div>
			</div>
		</div>
	`,

	data: function() {
		return {
			holes: [],
			winner: '',
			grassBlades: 859,
			turn: 'Player 1',
			players: {
				player1: {
					points: 0
				},

				player2: {
					points: 0
				}
			},
			opposingHolePairs: [
				{ 0: 12 }, { 12: 0 },
				{ 1: 11 }, { 11: 1 },
				{ 2: 10 }, { 10: 2 },
				{ 3: 9 }, { 9: 3 },
				{ 4: 8 }, { 8: 4 },
				{ 5: 7 }, { 7: 5 }
			]
		}
	},

	methods: {
		makeHoles: function() {
			for (var i = 0; i < 14; i++) {
				var hole = {};
				hole.number = i + 1;

				if (hole.number !== 7 && hole.number !== 14) {
					hole.stones = 4;
					hole.type = 'pit';
					hole.cssClasses = 'mancala__hole mancala__hole_pit';
				} else {
					hole.stones = 0;
					hole.type = 'store';
					hole.cssClasses = 'mancala__hole mancala__hole_store';
				}

				this.holes.push(hole);
			}
		},

		playTurn: function(hole, index) {
			if (this.turn === 'Player 1' && index <= 5) {
				return;
			}

			if (this.turn === 'Player 2' && index >= 7) {
				return;
			}

			if (hole.number !== 7 && hole.number !== 14) {
				var stonesCounter = hole.stones;
				var holeCounter = hole.number; // is already holes[i + 1]

				hole.stones = 0;

				for (var i = 0; i < stonesCounter; i++) {
					var holeEl = this.holes[holeCounter];

					if (!holeEl) {
						holeCounter = 0;
						holeEl = this.holes[holeCounter];
					}

					if (
						(holeEl.type === 'pit') ||
						(holeEl.number === 7 && this.turn === 'Player 2') ||
						(holeEl.number === 14 && this.turn === 'Player 1')
					) {
						if (i === stonesCounter - 1 && holeEl.stones === 0) {
							var isEmptyHole = true;
						}
						holeEl.stones++;

						if (isEmptyHole) {
							this.checkOpposingHoleCondition(holeEl);
						}

						holeCounter++;

						if (i === stonesCounter - 1) {
							if (this.turn === 'Player 1' && holeEl.number !== 14) {
								this.turn = 'Player 2';
							} else if (this.turn === 'Player 2' && holeEl.number !== 7) {
								this.turn = 'Player 1';
							}
						}
						

					} else {
						holeCounter++;
						i--;
					}
				}
			}

			this.checkWin();
		},

		makeOpposingCapture: function(holeElement, oppositeHoleIndex) {
			var storeIndex;
			if (this.turn === 'Player 1') {
				storeIndex = 13;
			} else {
				storeIndex = 6;
			}
			this.holes[storeIndex].stones += holeElement.stones + this.holes[oppositeHoleIndex].stones;
			holeElement.stones = 0;
			this.holes[oppositeHoleIndex].stones = 0;
		},

		checkOpposingHoleCondition: function(holeElement) {
			for(var i = 0; i < this.opposingHolePairs.length; i++) {
				var holeElIndex = holeElement.number - 1;
				
				if (this.opposingHolePairs[i][holeElIndex] >= 0) {
					this.makeOpposingCapture(holeElement, this.opposingHolePairs[i][holeElIndex]);
				}
			}
		},

		checkWin: function() {
			var player1out = true;
			var player2out = true;
			for (var i = 7; i < 13; i++) {
				if (this.holes[i].stones > 0) {
					player1out = false;
				}
			}
			for (var i = 0; i < 6; i++) {
				if (this.holes[i].stones > 0) {
					player2out = false;
				}
			}

			if (player1out) {
				for (var i = 0; i < 6; i++) {
					this.holes[6].stones += this.holes[i].stones
					this.holes[i].stones = 0;
				}

				this.determineWinner();
			}

			if (player2out) {
				for (var i = 7; i < 13; i++) {
					this.holes[13].stones += this.holes[i].stones
					this.holes[i].stones = 0;
				}

				this.determineWinner();
			}
		},

		determineWinner: function() {
			if (this.holes[6].stones > this.holes[13].stones) {
				this.winner = 'Player 2';
			} else if (this.holes[13].stones > this.holes[6].stones) {
				this.winner = 'Player 1';
			} else {
				this.winner = 'Tie';
			}
		}
	},

	created: function() {
		this.makeHoles();
	}
}

var Mancala = {
	template: `
		<div class="mancala">
			<h1 class="mancala__heading1 game99__game-title">Mancala</h1>
			
			<div class="mancala__board-wrapper">
				<man-board></man-board>
			</div>
		</div>
	`,

	components: {
		manBoard: manBoard
	}
}
