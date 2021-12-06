

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
        splitAllowed: {
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
            payment: 10,
            stepPayment: 10
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

        resetGame() {
            this.$emit("resetGame")
        },

        plus() {
            if (this.payment + this.stepPayment <= this.money) {
                this.payment += this.stepPayment;
            }
        },

        minus() {
            if (this.payment - this.stepPayment > 0) {
                this.payment -= this.stepPayment;
            }
        }


    }
}