['COEUR', 'PIQUE', 'TREFLE', 'CARREAU']

export default class CardModel {
    constructor(color, code, value) {
        this.color = color;
        this.code = code;
        this.value = value;
        this.double = false;

        var colorLabel;
        switch (this.color) {
            case "COEUR":
                colorLabel = "♡"
                break;
            case "PIQUE":
                colorLabel = "♤"
                break;
            case "CARREAU":
                colorLabel = "♢"
                break;
            case "TREFLE":
                colorLabel = "♧"
                break;
        }
        this.colorLabel = colorLabel;
    }

    get imagePath() {
        return `@/assets/images/cards/${this.color}_${this.code}`;
    }
}