import {Game} from "../game.js";
import {GAME_STATUSES} from "../GAME_STATUSES.js";

describe('game', () => {

    it('should should status pending after creating', () => {
        const game = new Game();
        expect(game.status).toEqual(GAME_STATUSES.PENDING);
    })
    it('should should status inProgress after creating', () => {
        const game = new Game();
        game.start()
        expect(game.status).toEqual(GAME_STATUSES.IN_PROGRESS);
    })
    it('google should be on the Grid after start', () => {
        const game = new Game();
        game.start()
        expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount);
        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
        expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
    })
    it('google should be on the Grid but in new position after jump', async () => {
        const game = new Game();
        game.googleJumpInterval = 10
        game.start()

        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition;
            await delay(10);
            const currentGooglePosition = game.googlePosition;
            expect(prevGooglePosition).not.toEqual(currentGooglePosition);
        }
    })
});

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

