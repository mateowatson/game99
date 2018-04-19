var Checkers = {
	template: `
		<div>
			<h1>Checkers</h1>
		</div>
	`,

	data: function() {
		return {
			board: [],
			pieces: {}
		}
	},

	methods: {
		createBoard: function() {
			for (var i = 0; i < 8; i++) {
				this.board.push([0, 1, 2, 3, 4, 5, 6, 7])
			}
		},

		createPieces: function() {
			var self = this;

			for (var i = 0; i < 25; i++) {
				var pieceName = 'piece' + i;
				this.pieces = Object.assign({}, self.pieces, {
					pieceName: 'hhh'
				});
				var player = 'Player 1';
				if (i > 11) {
					player = 'Player 2';
				}
			}
		}
	},

	created: function() {
		this.createBoard();
		this.createPieces();
	}
}
