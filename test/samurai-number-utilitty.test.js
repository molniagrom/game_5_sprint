import { SamuraiNumberUtilitty } from '../samurai-number-utilitty.js';

describe('SamuraiNumberUtility', () => {
    const utility = new SamuraiNumberUtilitty();

    test('returns an integer within range', () => {
        const from = 1;
        const to = 5; // Range [1, 4] inclusive

        // Check 100 times to increase the probability of error, if any
        for (let i = 0; i < 100; i++) {
            const result = utility.getRandomInteger(from, to);

            // Check 1: the result must be greater than or equal to the lower boundary (from)
            expect(result).toBeGreaterThanOrEqual(from);

            // Check 2: the result must be strictly less than the upper bound (to)
            expect(result).toBeLessThan(to);

            // Check 3: the result must be an integer
            expect(Number.isInteger(result)).toBe(true);
        }
    });

    test('throws error if fromInclusive is equal toExclusive', () => {
        const from = 5;
        const to = 5; // Диапазон равен 0. Должно вернуться только from.

        expect(() => utility.getRandomInteger(from, to)).toThrow(Error);
    });

    test('throws error if fromInclusive is greater than toExclusive', () => {
        const from = 5;
        const to = 3; // Incorrect range (5 > 3)

        // We expect a function call (inside an anonymous wrapper function)
        // will cause an error if from > to
        expect(() => utility.getRandomInteger(from, to)).toThrow(Error);
        // The screenshot uses .toThrow(Error) - if you want to be
        // more specific about the type of error, then use:
        // expect(() => utility.getRandomInteger(from, to)).toThrow(Error);
    });

    test('returns fromInclusive if toExclusive is just one more than fromInclusive', () => {
        const from = 5;
        const to = 6; // Range [5, 5] inclusive, i.e. only 5

        // In this tiny range (6 - 5 = 1) Math.floor(Math.random() * 1) function
        // will always return 0. Therefore, the result will always be 'from'.
        expect(utility.getRandomInteger(from, to)).toBe(from);
    });

    test('works with large range values', () => {
        // We use the "_" delimiter for ease of reading large numbers in JavaScript
        const from = 1_000_000;
        const to = 2_000_000;

        const result = utility.getRandomInteger(from, to);

        // Check that the received number is within a huge range
        expect(result).toBeGreaterThanOrEqual(from);
        expect(result).toBeLessThan(to);

        // Additional check to make sure it is an integer
        expect(Number.isInteger(result)).toBe(true);
    });
});