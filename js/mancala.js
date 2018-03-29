var manBoard = {
	template: `
		<div class="mancala__board">
			<h2 class="sr-only">Board</h2>

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
			// var self = this;

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

					} else {
						holeCounter++;
						i--;
					}
					// console.log(holeEl.number, stonesCounter, i);
				}
			}
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
				console.log(holeElIndex, this.opposingHolePairs[i][holeElIndex]);
				if (this.opposingHolePairs[i][holeElIndex] >= 0) {
					this.makeOpposingCapture(holeElement, this.opposingHolePairs[i][holeElIndex]);
				}
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

var mgrass = `
	<div class="mancala__grass" v-show="hole.type === 'store'">
		<div class="mancala__grass-blade" v-for="blade in grassBlades"></div>
	</div>
`;

var oldmethod = function() {
	stonesArray.forEach(function(stone, stoneInd) {
					self.holes.forEach(function(holeEl, holeInd) {
						if ((index + (stoneInd + 1)) < 13) {
							console.log('t: ', index + (stoneInd + 1));
							if (holeInd === index + (stoneInd + 1)) {
								if (
									(holeEl.type === 'pit') ||
									(holeEl.number === 7 && self.turn === 'Player 1') ||
									(holeEl.number === 14 && self.turn === 'Player 2')
								) {
									holeEl.stones += 1;
								}
							}
						} else {
							console.log(stoneInd - (stoneInd - 1));
							if (holeInd === stoneInd - (stoneInd - 1)) {
								if (
									(holeEl.type === 'pit') ||
									(holeEl.number === 7 && self.turn === 'Player 1') ||
									(holeEl.number === 14 && self.turn === 'Player 2')
								) {
									holeEl.stones += 1;
								}
							}
						}
					});
				});
}
