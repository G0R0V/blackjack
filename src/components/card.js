import CardModel from '@/models/card.model.js';


export default {
    name: 'Card',

    props: {
        card: {
            type: CardModel
        },
    },

    computed: {
        isBlack() {
            return this.card.color == 'PIQUE' || this.card.color == 'TREFLE';
        }
    }
}