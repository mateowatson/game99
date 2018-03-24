var hmBoard = {
	template: `
		<div class="hangman__board">
			<h2 class="sr-only">Board</h2>
			
			<div class="hangman__in-game-view" v-show="gameStatus === 'On'">
				<div class="hangman__phrase">
					<span v-for="letter in letters" class="hangman__char" :class="makeLetterClass(letter)">{{ letter }}</span>
				</div>

				<div class="hangman__guess-dialog">
					<input type="text" class="hangman__guess" v-model="guess" />
					<button class="btn hangman__btn" @click="makeGuess">Guess</button>
				</div>
				{{ numberGuessesMade }}
			</div>
			

			<div class="hangman__begin-dialog" v-show="gameStatus === 'Pre-Game'">
				<p>Type in the word for your opponent to guess.</p>
				<input type="text" class="hangman__input-phrase" v-model="phrase" />
				<button class="btn hangman__btn" @click="beginBtnHandler">Begin</button>
			</div>
			
		</div>
	`,

	data: function() {
		return {
			gameStatus: 'Pre-Game',
			phrase: '',
			letters: [],
			lettersGuessed: [],
			lettersGuessedWrong: [],
			guess: '',
			numberGuesses: 5,
			numberGuessesMade: 0
		}
	},

	methods: {
		makeGuess: function() {
			var self = this;

			if (this.guess.length < 1) return;
			if (this.guess.length > 1) return;
			if (this.guess === '"') return;
			if (this.guess === '\'') return;
			if (this.guess === '-') return;
			if (this.lettersGuessed.includes(this.guess)) return;
			if (this.lettersGuessedWrong.includes(this.guess)) return;


			if (!this.letters.includes(this.guess)) {
				this.numberGuessesMade++;
				this.lettersGuessedWrong.push(this.guess);
			} else {
				this.letters.forEach(function(letter, index) {
					if (self.guess === letter) {
						self.lettersGuessed.push(letter);
					}
				});
			}

			if (this.checkWin()) {
				this.gameStatus = 'You Won!';
			} else if (this.numberGuessesMade >= this.numberGuesses) {
				this.gameStatus = 'You Lost';
			}
		},

		checkWin: function() {
			var self = this;
			
			var letters = [];
			var lettersGuessed = [];

			self.letters.forEach(function(letter, index) {
				if (letter !== ' ' && letter !== '\'' && letter !== '"' && letter !== '-') {
					letters.push(letter);
				}
			});

			self.lettersGuessed.forEach(function(letter, index) {
				lettersGuessed.push(letter);
			});

			letters.sort();

			lettersGuessed.sort();

			var compressedLetters = letters.filter(function(el, ind, arr) {
				return el !== arr[ind + 1];
			});

			var compressedLettersGuessed = lettersGuessed.filter(function(el, ind, arr) {
				return el !== arr[ind + 1];
			});

			var winCounter = 0;

			for (var i = 0; i < compressedLetters.length; i++) {
				if (compressedLetters[i] === compressedLettersGuessed[i]) {
					winCounter++;
				}
			}

			if (winCounter === compressedLetters.length) {
				return true;
			}
		},

		makeLetterClass: function(letter) {
			var letterClass = '';

			if (this.lettersGuessed.includes(letter)) {
				letterClass += 'hangman__char_revealed ';
			}

			if (letter === ' ') {
				return letterClass += 'hangman__space';
			} else if (letter === '\'' || letter === '-' || letter === '"') {
				return letterClass += 'hangman__special-char';
			} else {
				return letterClass += 'hangman__letter';
			}
		},

		beginBtnHandler: function() {
			this.createLetters();
			this.gameStatus = 'On';
		},

		createLetters: function() {
			this.letters = this.phrase.split('');
		}
	}
};

var Hangman = {
	template: `
		<div class="hangman">
			<h1 class="hangman__heading1 game99__game-title">Hangman</h1>

			<hm-board></hm-board>
		</div>
	`,

	components: {
		hmBoard: hmBoard
	}
};
