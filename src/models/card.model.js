

export default class CardModel {
    constructor(color, code, value) {
        this.color = color;
        this.code = code;
        this.value = value;
    }

    get imagePath() {
        return `@/assets/images/cards/${this.color}_${this.code}`;
    }
}