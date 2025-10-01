import {GAME_STATUSES} from "./GAME_STATUSES.js";
import {SamuraiNumberUtilitty} from "./samurai-number-utilitty.js";
import {GridSettings} from "./Settings.js";

export class Game {
    #settings = {
        gridSize: null,
        googleJumpInterval: 1000,
    }
    // #settings = {
    //     gridSize: {
    //         columnsCount: 4,
    //         rowsCount: 4,
    //     },
    //     googleJumpInterval: 1000,
    // }
    #gameStatus = GAME_STATUSES.PENDING
    #googleStepCount = 0;
    #googleIdInterval;
    #googleMaxStepCount = 5; // для всего что я могу выбирать на интерфейсе Неплохо было бы завести классы
    #playersPoints = 0;
    #googlePosition = null
    #player1Position = null;
    #player2Position = null;
    /**
     * @type SamuraiNumberUtilitty
     */
    #numberUtility;

    constructor() {
        this.#numberUtility = new SamuraiNumberUtilitty
    }

    #stopGame() {
        this.#gameStatus = GAME_STATUSES.GOOGLE_WIN;
        clearInterval(this.#googleIdInterval)
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
        this.#settings.gridSize = new GridSettings(4, 4)
        this.#jumpGoogle()
        this.#generatePlayer1Position()
        this.#generatePlayer2Position()

       this.#googleIdInterval = setInterval(() => { //todo: google escape
            this.#jumpGoogle()
        }, this.#settings.googleJumpInterval);
    }

    #generatePlayer1Position() {
        const newPlayer1Position = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
        }
        if (newPlayer1Position.x === this.googlePosition?.x && newPlayer1Position.y === this.googlePosition?.y) {
            this.#generatePlayer1Position()
            return
        }
        this.#player1Position = newPlayer1Position
    }

    #generatePlayer2Position() {
        const newPlayer2Position = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
        }
        if (newPlayer2Position.x === this.#player1Position?.x && newPlayer2Position.y === this.#player1Position?.y) {
            this.#generatePlayer2Position()
            return
        }

        if (newPlayer2Position.x === this.googlePosition?.x && newPlayer2Position.y === this.googlePosition?.y) {
            this.#generatePlayer2Position()
            return
        }
        this.#player2Position = newPlayer2Position
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

        if (this.#player1Position !== null
            && this.#player1Position.x === this.googlePosition?.x
            && this.#player1Position.y === this.googlePosition?.y
        ) {
            this.#jumpGoogle()
            return
        }

        if (this.#player2Position !== null
            && this.#player2Position.x === this.googlePosition?.x
            && this.#player2Position.y === this.googlePosition?.y
        ) {
            this.#jumpGoogle()
            return
        }

        this.#googleStepCount++
        this.#googlePosition = newPosition;

        if (this.#googleStepCount === this.#googleMaxStepCount) {
            this.#stopGame()
        }
    }
}

const game = new Game();

