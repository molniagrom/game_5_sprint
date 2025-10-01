import {GAME_STATUSES} from "./GAME_STATUSES.js";
import {SamuraiNumberUtilitty} from "./samurai-number-utilitty.js";

export class Game {
    #settings = {
        gridSize: {
            columnsCount: 4,
            rowsCount: 4,
        },
        googleJumpInterval: 1000,
    }
    #gameStatus = GAME_STATUSES.PENDING
    #googlePosition = null
    /**
     * @type SamuraiNumberUtilitty
     */
    #numberUtility;

    constructor() {
        this.#numberUtility = new SamuraiNumberUtilitty
    }

    set googleJumpInterval(value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error('Google jump interval must be a positive integer');
        }
        this.#settings.googleJumpInterval = value;
    }

    get status() {
        return this.#gameStatus;
    }

    get googlePosition() {
        return this.#googlePosition;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    start() {
        this.#gameStatus = GAME_STATUSES.IN_PROGRESS;
        this.#jumpGoogle()
        setInterval(() => { //todo: google escape
            this.#jumpGoogle()
        }, this.#settings.googleJumpInterval);
    }

    #jumpGoogle() {
        const newPosition = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
        }
        if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
            this.#jumpGoogle()
            return
        }

        this.#googlePosition = newPosition;
    }
}

const game = new Game();

