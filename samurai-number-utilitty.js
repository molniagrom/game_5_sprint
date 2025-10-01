export class SamuraiNumberUtilitty {
    /**
     * Generates a random integer between the specified range.
     *
     * @param {number} fromInclusive - The lower bound of the range (inclusive).
     * @param {number} toExclusive - The upper bound of the range (exclusive).
     * @returns {number} A random integer between fromInclusive (inclusive) and toExclusive (exclusive).
     * @throws {Error} Throws an error if fromInclusive is not less than toExclusive.
     */
    getRandomInteger(fromInclusive, toExclusive) {
        if (fromInclusive >= toExclusive) {
            throw new Error("Form must be less then to")
        }

        return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
    }
}