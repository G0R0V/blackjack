import Card from '@/components/card.vue'

import CardModel from '@/models/card.model.js';

export default {
    name: 'Index',

    components: {
        Card
    },

    data() {
        return {
            money: 100,
            payment: 5,

            roundStarted: false,
            userStay: false,
            croupierStay: false,

            deck: [], // deck[CardModel]
            colors: ['COEUR', 'PIQUE', 'TREFLE', 'CARREAU'],
            cards: [
                { code: 'AS', value: 1 },
                { code: '2', value: 2 },
                { code: '3', value: 3 },
                { code: '4', value: 4 },
                { code: '5', value: 5 },
                { code: '6', value: 6 },
                { code: '7', value: 7 },
                { code: '8', value: 8 },
                { code: '9', value: 9 },
                { code: '10', value: 10 },
                { code: 'J', value: 10 },
                { code: 'Q', value: 10 },
                { code: 'K', value: 10 }
            ],

            userCards: [],
            croupierCards: []

        }
    },

    computed: {
        userScore() {
            if (this.userCards.length == 0) return null;
            return this.userCards.reduce(function (accumulator, currentCard) {
                return accumulator + currentCard.value;
            }, 0);
        },

        croupierScore() {
            if (this.croupierCards.length == 0) return 0;
            return this.croupierCards.reduce(function (accumulator, currentCard) {
                return accumulator + currentCard.value;
            }, 0);
        },

        isUserBlackjack() {
            if (this.userCards.length == 0) return null;
            return this.userCards.length == 2 && this.userScore == 21;
        },

        isCroupierBlackjack() {
            if (this.croupierCards.length == 0) return null;
            return this.croupierCards.length == 2 && this.croupierScore == 21;
        },

        userWin() {
            //Defeat
            if (this.userScore > 21) return false;

            // Round finished
            if (this.userStay && this.croupierStay) {
                // Defeat
                if (this.userScore < this.croupierScore && this.croupierScore <= 21) return false;

                // Victory
                if (this.userScore > this.croupierScore) return true;
                if (this.userScore < this.croupierScore && this.croupierScore > 21) return true;

                // Null
                if (this.userScore == this.croupierScore) return null;
            }

            return undefined; // Round in progress
        },

        isRoundFinished() {
            return this.userWin === true || this.userWin === false;
        }
    },

    watch: {
        isUserBlackjack: {
            handler() {
                if (this.isUserBlackjack) this.stay();
            }
        },

        userScore: {
            handler() {
                if (this.userScore >= 21) this.stay();
            }
        }
    },

    methods: {
        startGame() {
            this.deck = [];
            this.userCards = [];
            this.croupierCards = [];
            this.payment = 5;
            this.money = 100;
            this.roundStarted = false;
            this.croupierStay = false;
            this.userStay = false;

            //TODO : delete after this comment
            this.bet()
        },

        bet() {
            this.money -= this.payment;
            this.startRound();
        },

        startRound() {
            this.roundStarted = true;

            // Deck
            this.generateNewDeck();
            this.shuffleDeck();

            // Draw 
            this.drawUserCard();
            setTimeout(() => {
                this.drawCroupierCard()
            }, 300);
            setTimeout(() => {
                this.drawUserCard()
            }, 600)

            // DRAW BLACKJACK
            // this.userCards = [
            //     new CardModel("PIQUE", "AS", 11), new CardModel("PIQUE", "K", 10)
            // ]
        },

        generateNewDeck() {
            this.deck = [];
            for (let c = 0; c < this.colors.length; c++) { // Colors
                for (let i = 0; i < this.cards.length; i++) { // Values
                    var card = new CardModel(this.colors[c], this.cards[i].code, this.cards[i].value)
                    this.deck.push(card);
                }
            }
        },

        shuffleDeck() {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        },

        drawCard() {
            var card = this.deck.shift();
            if (card == undefined) {
                alert("Card undefined : deck empty");
                return null
            }

            return card;
        },

        drawUserCard() {
            var card = this.drawCard();

            if (card.code == 'AS' && this.userScore + 11 <= 21) {
                card.value = 11;
            }

            this.userCards.push(card);
        },

        drawCroupierCard() {
            var card = this.drawCard();
            this.croupierCards.push(card);
        },

        stay() {
            this.userStay = true;

            if (this.userScore <= 21) {
                while (this.croupierScore < 17) {
                    this.drawCroupierCard()
                }
            }

            this.croupierStay = true;
        }
    },

    created() {
        this.startGame();
    }
}