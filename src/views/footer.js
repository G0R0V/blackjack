

export default {
    name: 'Footer',

    props: {
        userWin: {
            type: Boolean
        },
        userScore: {},

        roundStarted: {
            type: Boolean
        },

        roundFinished: {
            type: Boolean
        },

        doubleAllowed: {
            type: Boolean
        },

        userStand: {

        },

        userCards: {
            default: []
        },
        money: {}
    },

    data() {
        return {
            payment: 5
        }
    },

    watch: {
        roundFinished: {
            handler() {
                if (this.roundFinished && this.payment > this.money) {
                    this.payment = this.money;
                }
            }
        }
    },

    methods: {
        bet() {
            this.$emit("bet", { payment: this.payment })
        },

        hit() {
            this.$emit("hit")
        },

        double() {
            this.$emit("double")
        },

        slipt() {
            this.$emit("split")
        },

        stand() {
            this.$emit("stand")
        },

        startGame() {
            this.$emit("startGame")
        },

        plus() {
            if (this.payment + 5 <= this.money) {
                this.payment += 5;
            }
        },

        minus() {
            if (this.payment - 5 > 0) {
                this.payment -= 5;
            }
        }


    }
}