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
				{ title: 'Tic Tac Toe', view: 'tictactoe' },
				{ title: 'Mancala', view: 'mancala' }
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
		currentView: 'mancala'
	},

	components: {
		home: Home,
		hangman: Hangman,
		tictactoe: TicTacToe,
		mancala: Mancala
	},

	methods: {
		startGame: function(game) {
			this.currentView = game.view;
			window.location.hash = '#' + game.view;
		},

		goHome: function() {
			this.currentView = 'home';
		},

		getCurrentViewFromUrl: function() {
			console.log(window.location.hash);
			windowHash = window.location.hash;

			switch (windowHash) {
				case '#tictactoe':
					this.currentView = 'tictactoe';
					break;
				case '#hangman':
					this.currentView = 'hangman';
					break;
				case '#mancala':
					this.currentView = 'mancala';
					break;
				default:
					this.currentView = 'home';
			}
		}
	},

	created: function () {
		eventHub.$on('start-game', this.startGame);
		eventHub.$on('go-home', this.goHome);

		this.getCurrentViewFromUrl();
	},
});

window.onhashchange = function() {
	if (!window.location.hash) {
		window.location = window.location;
	}
}
