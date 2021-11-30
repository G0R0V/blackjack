import Card from '@/components/card.vue'
import Footer from '@/views/footer.vue'

import CardModel from '@/models/card.model.js';

export default {
    name: 'Index',

    components: {
        Card,
        Footer
    },

    data() {
        return {
            money: 100,
            payment: 5,

            roundStarted: false,
            userStand: false,
            dealerStand: false,

            deck: [], // deck[CardModel]
            numberDecks: 6,
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
            dealerCards: []

        }
    },

    computed: {
        userScore() {
            if (this.userCards.length == 0) return 0;
            return this.userCards.reduce(function (accumulator, currentCard) {
                return accumulator + currentCard.value;
            }, 0);
        },

        dealerScore() {
            if (this.dealerCards.length == 0) return 0;
            return this.dealerCards.reduce(function (accumulator, currentCard) {
                return accumulator + currentCard.value;
            }, 0);
        },

        isUserBlackjack() {
            if (this.userCards.length == 0) return null;
            return this.userCards.length == 2 && this.userScore == 21;
        },

        isDealerBlackjack() {
            if (this.dealerCards.length == 0) return null;
            return this.dealerCards.length == 2 && this.dealerScore == 21;
        },

        userWin() {
            //Defeat
            if (this.userScore > 21) return false;

            // Round finished
            if (this.userStand && this.dealerStand) {
                // Defeat
                if (this.userScore < this.dealerScore && this.dealerScore <= 21) return false;

                // Victory
                if (this.userScore > this.dealerScore) return true;
                if (this.userScore < this.dealerScore && this.dealerScore > 21) return true;

                // Null
                if (this.userScore == this.dealerScore) return null;
            }

            return undefined; // Round in progress
        },

        roundFinished() {
            return this.userWin !== undefined;
        },

        doubleAllowed() {
            return this.payment <= this.money
        },

        splitAllowed() {
            return this.userCards.length == 2 && this.userCards[0].code == this.userCards[1].code;
        }
    },

    watch: {
        isUserBlackjack: {
            handler() {
                if (this.isUserBlackjack) {
                    this.money += (this.payment * 2.5)
                    this.stand();
                }
            }
        },

        userScore: {
            handler() {
                if (this.userScore >= 21) this.stand();
            }
        },

        roundFinished: {
            handler() {
                if (this.roundFinished) {
                    if (this.userWin == true) {
                        this.money += (this.payment * 2)
                    }
                    else if (this.userWin === null && !this.isUserBlackjack) {
                        this.money += this.payment;
                    }
                }
            }
        }
    },

    methods: {
        startGame() {
            this.deck = [];
            this.userCards = [];
            this.dealerCards = [];
            this.roundStarted = false;
            this.dealerStand = false;
            this.userStand = false;
        },

        resetGame() {
            this.money = 100;
            this.payment = 5;
        },

        bet(payload) {
            this.payment = payload.payment;
            this.money -= this.payment;
            this.startGame();
            this.startRound();
        },

        startRound() {
            this.roundStarted = true;

            // Deck
            this.generateNewDeck();
            this.shuffleDeck();

            // Hit 
            this.hitUserCard();
            setTimeout(() => {
                this.hitDealerCard()
            }, 700);
            setTimeout(() => {
                this.hitUserCard()
            }, 1400)

            // // HIT BLACKJACK
            // this.userCards = [
            //     new CardModel("PIQUE", "AS", 11), new CardModel("PIQUE", "K", 10)
            // ]
        },

        generateNewDeck() {
            this.deck = [];
            for (let n = 0; n < this.numberDecks; n++) { // Number of decks
                for (let c = 0; c < this.colors.length; c++) { // Colors
                    for (let i = 0; i < this.cards.length; i++) { // Values
                        var card = new CardModel(this.colors[c], this.cards[i].code, this.cards[i].value)
                        this.deck.push(card);
                    }
                }
            }
        },

        shuffleDeck() {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        },

        hitCard() {
            var card = this.deck.shift();
            if (card == undefined) {
                alert("Card undefined : deck empty");
                return null
            }

            return card;
        },

        hitUserCard() {
            var card = this.hitCard();

            if (card.code == 'AS' && this.userScore + 11 <= 21) {
                card.value = 11;
            }

            this.userCards.push(card);
        },

        hitDealerCard() {
            var card = this.hitCard();

            if (card.code == 'AS' && this.dealerScore + 11 <= 21) {
                card.value = 11;
            }

            this.dealerCards.push(card);
        },

        double() {
            this.money -= this.payment;
            this.payment *= 2;

            this.hitUserCard();
            this.stand();
        },

        async stand() {
            this.userStand = true;

            if (this.userScore <= 21) {
                while (this.dealerScore < 17) {
                    if (this.dealerScore < 17) {
                        await this.timer(1000)
                    }
                    this.hitDealerCard();
                }
            }

            this.dealerStand = true;
        },

        split() {
            //Todo
        },

        timer(ms) {
            return new Promise(res => setTimeout(res, ms));
        }
    },

    created() {
        this.startGame();
    }
}