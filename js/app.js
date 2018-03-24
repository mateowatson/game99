var Home = {
	template: `
		<div class="game99-home bg-primary">
			<div class="game99-home__inner">
				<div class="card">
					<div class="card-body">
						<h1 class="game99-home__title card-title" v-html="title"></h1>
						<p class="card-text">{{ tagline }}</p>
						<select class="custom-select game99-home__select" name="selectgame" id="selectgame" v-model="gameSelected">
							<option disabled value="">Games</option>
							<option v-for="game in games" :value="game.view">{{ game.title }}</option>
						</select>
						<button class="btn game99__btn_primary" @click="startGame">Start</button>
					</div>
				</div>
			</div>
			
		</div>
	`,

	data: function() {
		return {
			title: 'Matt Watson&rsquo;s Games',
			tagline: 'Handmade Web Games For Your Enjoyment',
			games: [
				{ title: 'Hangman', view: 'hangman'},
				{ title: 'Tic Tac Toe', view: 'tictactoe' }
			],
			gameSelected: ''
		}
	},

	methods: {
		startGame: function() {
			eventHub.$emit('start-game', { view: this.gameSelected });
		}
	}
}

// This is the event hub we'll use in every
// component to communicate between them.
// https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced
var eventHub = new Vue();

var app = new Vue({
	el: '#app',

	data: {
		currentView: 'hangman'
	},

	components: {
		home: Home,
		hangman: Hangman,
		tictactoe: TicTacToe
	},

	methods: {
		startGame: function(game) {
			this.currentView = game.view;
		},

		goHome: function() {
			this.currentView = 'home';
		}
	},

	created: function () {
		eventHub.$on('start-game', this.startGame);
		eventHub.$on('go-home', this.goHome);
	},
});
