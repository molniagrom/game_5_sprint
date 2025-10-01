export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(otherPosition) {
        return this.x === otherPosition.x && this.y === otherPosition.y;
    }
}
