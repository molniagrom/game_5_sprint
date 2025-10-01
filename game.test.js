import { Game } from "./game.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";

describe('Game', () => {

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    it('should have status pending after creating', () => {
        const game = new Game();
        expect(game.status).toEqual(GAME_STATUSES.PENDING);
    });

    it('should have status inProgress after start', () => {
        const game = new Game();
        game.start();
        expect(game.status).toEqual(GAME_STATUSES.IN_PROGRESS);
    });

    it('google should be on the grid after start', async () => {
        const game = new Game();
        game.start();
        await delay(20); // ждём первого прыжка Google
        expect(game.googlePosition).not.toBeNull();
        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
        expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount);
        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
        expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
    });

    it('player1 and player2 should be inside the grid', () => {
        const game = new Game();
        game.start();
        const p1 = game.player1Position;
        const p2 = game.player2Position;

        expect(p1).not.toBeNull();
        expect(p1.x).toBeGreaterThanOrEqual(0);
        expect(p1.x).toBeLessThan(game.gridSize.columnsCount);
        expect(p1.y).toBeGreaterThanOrEqual(0);
        expect(p1.y).toBeLessThan(game.gridSize.rowsCount);

        expect(p2).not.toBeNull();
        expect(p2.x).toBeGreaterThanOrEqual(0);
        expect(p2.x).toBeLessThan(game.gridSize.columnsCount);
        expect(p2.y).toBeGreaterThanOrEqual(0);
        expect(p2.y).toBeLessThan(game.gridSize.rowsCount);
    });

    it('players should not overlap each other or Google', async () => {
        const game = new Game();
        game.start();
        await delay(20); // ждём первого прыжка Google

        const p1 = game.player1Position;
        const p2 = game.player2Position;
        const g = game.googlePosition;

        expect(p1).not.toEqual(p2);
        expect(p1).not.toEqual(g);
        expect(p2).not.toEqual(g);
    });

    it('google should jump to new positions', async () => {
        const game = new Game();
        game.googleJumpInterval = 10;
        game.start();

        let prev = null;
        for (let i = 0; i < 10; i++) {
            await delay(15);
            const current = game.googlePosition;
            if (prev) {
                expect(current).not.toEqual(prev);
            }
            prev = current;
        }
    });

    it('google should never jump on player positions', async () => {
        const game = new Game();
        game.googleJumpInterval = 5;
        game.start();

        for (let i = 0; i < 20; i++) {
            await delay(10);
            const g = game.googlePosition;
            const p1 = game.player1Position;
            const p2 = game.player2Position;
            expect(g).not.toEqual(p1);
            expect(g).not.toEqual(p2);
        }
    });

    it('should stop the game and set status GOOGLE_WIN after max step count', async () => {
        const game = new Game();
        game.googleJumpInterval = 5;
        game.start();

        await delay(game["#googleMaxStepCount"] * game.googleJumpInterval + 20);
        expect(game.status).toEqual(GAME_STATUSES.GOOGLE_WIN);
    });
});
