export class GridSettings {
    constructor(columnsCount, rowsCount) {
        this.columnsCount = columnsCount;
        this.rowsCount = rowsCount;
    }
}

//...............................................
// There is no need to look at the situation yet

export class GoogleSettings {
    constructor(googleJumpInterval) {
        this.googleJumpInterval = googleJumpInterval;
    }
}

export class Settings {
    constructor(gridSettings, googleSettings) {
        this.grid = gridSettings;
        this.google = googleSettings;
    }
}
