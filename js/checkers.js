var Checkers = {
	template: `
		<div>
			<h1>Checkers</h1>
			<div class="checkers__board">
				<div
					v-for="(row, rowIndex) in board"
					class="checkers__row">
					<div
						v-for="(space, spaceIndex) in row"
						class="checkers__space"
						@click="spaceClickHandler(rowIndex, spaceIndex)">
						<div
							v-for="(availableMove, avMoveIndex) in availableMoves"
							class="checkers__space-available "
							:class="(rowIndex === availableMove[0] && spaceIndex === availableMove[1] ? 'checkers__space-available_true' : 'checkers__space-available_false')">
						</div>
					</div>
				</div>
				<div
					v-for="(piece, index) in pieces"
					class="checkers__piece"
					:class="(index <= 11 ? 'checkers__piece_player2 ' : ' ') + (piece.moveMode ? 'checkers__piece_move ' : ' ')"
					:style="'top: ' + piece.location[0] + 'px; left: ' + piece.location[1] + 'px;'"
					@click="pieceClickHandler(piece, index)">
				</div>
			</div>
		</div>
	`,

	data: function() {
		return {
			board: [],
			pieces: [],
			coordinates: [],
			turn: 'Player 1',
			moveMode: false,
			availableMoves: []
		}
	},

	methods: {
		createBoard: function() {
			for (var i = 0; i < 8; i++) {
				this.board.push([0, 1, 2, 3, 4, 5, 6, 7])
			}
		},

		createPieces: function() {
			for (var i = 0; i < 24; i++) {
				var player = 2;
				var row;
				var cell;
				var location;
				var piece;

				if (i > 11) {
					player = 1;
				}

				if (player === 2) {
					if (i < 4) {
						row = 0;
						cell = i * 2 + 1;
					} else if (i >= 4 && i < 8) {
						row = 1;
						cell = (i - 4) * 2;
					} else if (i >= 8 && i < 12) {
						row = 2;
						cell = (i - 8) * 2 + 1;
					}
					
					location = this.coordinates[row][0][cell];

					piece = {
						id: i,
						player: player,
						location: location,
						boardRow: row,
						boardCell: cell
					}
				} else {
					if (i <= 15) {
						row = 5;
						cell = (i - 12) * 2;
					} else if (i > 15 && i < 20) {
						row = 6;
						cell = (i - 16) * 2 + 1;
					} else if (i >= 20 && i < 24) {
						row = 7;
						cell = (i - 20) * 2;
					}

					location = this.coordinates[row][0][cell];

					piece = {
						id: i,
						player: player,
						location: location,
						boardRow: row,
						boardCell: cell
					}
				}

				piece.moveMode = false;
				this.pieces.push(piece);
			}
		},

		createCoordinates: function() {
			var rowCoorValue = 25;
			for (var ri = 0; ri < 8; ri++) {
				var cellCoorValue = 25;

				var cellCoors = [];

				for (var ci = 0; ci < 8; ci++) {
					cellCoors.push([rowCoorValue - 20, cellCoorValue - 20]);
					cellCoorValue += 50;
				}

				this.coordinates.push([cellCoors]);

				rowCoorValue += 50;
			}

			// console.log(this.coordinates[0][0][3]);
		},

		pieceClickHandler: function(piece, index) {
			if (!this.moveMode && !piece.moveMode) {
				this.moveMode = true;
				piece.moveMode = true;

				// Find empty spaces in front
				var forward = (piece.player === 1 ? -1 : 1);
				// console.log(forward);
				var row = piece.boardRow + forward;
				// console.log(row);
				var spaceLeft = [row, piece.boardCell - 1];
				var spaceRight = [row, piece.boardCell + 1];
				var isAvailableSpaceLeft = true;
				var isAvailableSpaceRight = true;

				for (var i = 0; i < this.pieces.length; i++) {
					if (spaceLeft[0] === this.pieces[i].boardRow && spaceLeft[1] === this.pieces[i].boardCell) {
						isAvailableSpaceLeft = false;
					}

					if (spaceRight[0] === this.pieces[i].boardRow && spaceRight[1] === this.pieces[i].boardCell) {
						isAvailableSpaceRight = false;
					}
				}

				if (!isAvailableSpaceLeft) {
					var jumpSpaceLeft = [row + forward, spaceLeft[1] - 1];
					var jumpSpaceRight = [row + forward, spaceLeft[1] + 2];
					var isAvailableJumpSpaceLeft = true;
					console.log(jumpSpaceLeft);
					console.log(jumpSpaceRight);

					for (var i = 0; i < this.pieces.length; i++) {
						if (jumpSpaceLeft[0] === this.pieces[i].boardRow && jumpSpaceLeft[1] === this.pieces[i].boardCell) {
							isAvailableJumpSpaceLeft = false;
						}

						if (jumpSpaceRight[0] === this.pieces[i].boardRow && jumpSpaceRight[1] === this.pieces[i].boardCell) {
							isAvailableJumpSpaceLeft = false;
						}
					}

					if (isAvailableJumpSpaceLeft) {
						this.availableMoves.push(jumpSpaceLeft);
					}
				}

				if (isAvailableSpaceLeft) {
					this.availableMoves.push(spaceLeft);
				}

				if (isAvailableSpaceRight) {
					this.availableMoves.push(spaceRight);
				}
			} else if (this.moveMode && piece.moveMode) {
				this.moveMode = false;
				piece.moveMode = false;
				for (var i = 0; i <= this.availableMoves.length; i++) {
					this.availableMoves.pop();
				}
			}
		},

		spaceClickHandler: function(rowIndex, spaceIndex) {
			if (this.moveMode) {
				var isAvailable = false;
				
				for (var i = 0; i < this.availableMoves.length; i++) {
					if (rowIndex === this.availableMoves[i][0] && spaceIndex === this.availableMoves[i][1]) {
						isAvailable = true;
					}
				}

				if (isAvailable) {

					for (var i = 0; i < this.pieces.length; i++) {
						if (this.pieces[i].moveMode) {
							this.pieces[i].boardCell = spaceIndex;
							this.pieces[i].boardRow = rowIndex;
							this.pieces[i].location = this.coordinates[rowIndex][0][spaceIndex];
						}
					}
				}
			}
		}
	},

	created: function() {
		this.createBoard();
		this.createCoordinates();
		this.createPieces();
	}
}
