var Checkers = {
	template: `
		<div>
			<h1>Checkers</h1>
			<p>Turn: Player {{ player }}</p>
			<div class="checkers__board">
				<div
					v-for="(row, rowIndex) in board"
					class="checkers__row">
					<div
						v-for="(space, spaceIndex) in row"
						class="checkers__space">
						<div
							v-for="(availableMove, avMoveIndex) in availableMoves"
							class="checkers__space-available ">
						</div>
					</div>
				</div>
			</div>
		</div>
	`,

	data: function() {
		return {
			board: [],
			coordinates: [],
			player: 1,
			moveMode: false,
			availableMoves: []
			players: {
				player1: {},
				player2: {}
			}
		}
	},

	methods: {
		createSpaces: function() {
			var space = {};
			var spaceOccupant = this.players.player1;
			var spaceOccupantStatus = 'man';
			var forward = 1;
			var possibleMoves = function(pm_spaceOccupantStatus) {

			};
		}
	},

	created: function() {
		this.createSpaces();
	}
}
