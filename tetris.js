const constants = {
    initialTickLength: 500,
    logLevel: "stateOnly",
    logState: true,
    numRows: 24,
    numCols: 10,
    rowsPerSpeedIncrease: 10
};

constants.iRotations = [
    [[1, 0], [1, 1], [1, 2], [1, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]]
];

constants.jRotations = [
    [[1, 3], [2, 3], [2, 2], [2, 1]],
    [[3, 3], [3, 2], [2, 2], [1, 2]],
    [[3, 1], [2, 1], [2, 2], [2, 3]],
    [[1, 1], [1, 2], [2, 2], [3, 2]]
];

constants.lRotations = [
    [[1, 1], [1, 2], [1, 3], [2, 3]],
    [[0, 2], [1, 2], [2, 2], [2, 1]],
    [[1, 3], [1, 2], [1, 1], [0, 1]],
    [[2, 2], [1, 2], [0, 2], [0, 3]]
];

constants.sRotations = [
    [[0, 3], [1, 3], [1, 2], [2, 2]],
    [[2, 3], [2, 2], [1, 2], [1, 1]]
];

constants.tRotations = [
    [[1, 3], [2, 2], [1, 2], [1, 1]],
    [[2, 2], [1, 1], [1, 2], [0, 2]],
    [[1, 1], [0, 2], [1, 2], [1, 3]],
    [[0, 2], [1, 3], [1, 2], [2, 2]]
];

constants.zRotations = [
    [[0, 2], [1, 2], [1, 3], [2, 3]],
    [[1, 3], [1, 2], [2, 2], [2, 1]]
];

constants.oRotations = [[[1, 2], [1, 3], [2, 3], [2, 2]]];

constants.colors = {
    BLUE: {
        active: "tetris-blue-block",
        fixed: "tetris-blue-fixed-block"
    },
    RED: {
        active: "tetris-red-block",
        fixed: "tetris-red-fixed-block"
    },
    GREEN: {
        active: "tetris-green-block",
        fixed: "tetris-green-fixed-block"
    },
    YELLOW: {
        active: "tetris-yellow-block",
        fixed: "tetris-yellow-fixed-block"
    },
    PURPLE: {
        active: "tetris-purple-block",
        fixed: "tetris-purple-fixed-block"
    },
    ORANGE: {
        active: "tetris-orange-block",
        fixed: "tetris-orange-fixed-block"
    },
    BROWN: {
        active: "tetris-brown-block",
        fixed: "tetris-brown-fixed-block"
    }
};

constants.rotations = [
    constants.iRotations,
    constants.jRotations,
    constants.lRotations,
    constants.oRotations,
    constants.sRotations,
    constants.tRotations,
    constants.zRotations
];

constants.colorArray = [
    constants.colors.RED,
    constants.colors.GREEN,
    constants.colors.BLUE,
    constants.colors.YELLOW,
    constants.colors.PURPLE,
    constants.colors.ORANGE,
    constants.colors.BROWN
];

constants.activeColorArray = [
    constants.colors.RED.active,
    constants.colors.GREEN.active,
    constants.colors.BLUE.active,
    constants.colors.YELLOW.active,
    constants.colors.PURPLE.active,
    constants.colors.ORANGE.active,
    constants.colors.BROWN.active
];

constants.fixedColorArray = [
    constants.colors.RED.fixed,
    constants.colors.GREEN.fixed,
    constants.colors.BLUE.fixed,
    constants.colors.YELLOW.fixed,
    constants.colors.PURPLE.fixed,
    constants.colors.ORANGE.fixed,
    constants.colors.BROWN.fixed
];

constants.colorClassesArray = [
    ...constants.activeColorArray,
    ...constants.fixedColorArray
];

constants.cssClasses = {
    ACTIVE_BLOCK: "tetris-active-block",
    FIXED_BLOCK: "tetris-fixed-block",
    PREVIEW_AREA: "next-piece-preview"
};

function Piece(initPos, rotationSet, rotationIndex, color) {
    const shape = rotationSet[rotationIndex];

    return Object.create({
        shape,
        position: initPos,
        rotationIndex,
        rotationSet,
        color
    });
}

Piece.getRandomPiece = position => {
    const pieceIndex = Math.floor(Math.random() * constants.rotations.length);
    const rotationIndex = Math.floor(
        Math.random() * constants.rotations[pieceIndex].length
    );
    return Piece(
        position,
        constants.rotations[pieceIndex],
        rotationIndex,
        constants.colorArray[pieceIndex]
    );
};

// can describe state with array of subarrays with 0's and 1's
// if the array's length is less than numRows, remainder are
// assumed to be empty

// template rows:
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const test = {
    stateDescriptions: {}
};

test.stateDescriptions.SINGLE_LINE_CLEAR = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
test.stateDescriptions.DOUBLE_LINE_CLEAR = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
test.stateDescriptions.TRIPLE_LINE_CLEAR = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
test.stateDescriptions.QUAD_LINE_CLEAR = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
test.stateDescriptions.TRIPLE_LINE_CLEAR_OVER_BLOCKS = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
];
test.stateDescriptions.BLOCK_DROP_TEST = [
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function Game(initialState = []) {
    // Populate state array
    const state = Game.updateState(initialState);

    // Calculate starting position for blocks based on number of columns:
    const startX = Math.floor(constants.numCols / 2) - 1;
    const startPosition = [startX, 0];

    // Initialize settings:
    const controlsDisabled = false;
    const gameOver = false;

    // Initialize game statistics:
    const level = 1;
    const rowsCleared = 0;
    const score = 0;

    // Initialize pieces:
    const currentPiece = Piece.getRandomPiece(startPosition);
    const nextPiece = Piece.getRandomPiece(startPosition);

    // Initialize time:
    let tStart;
    const tLength = constants.initialTickLength;

    // Return a new object with the following as its prototype:
    return Object.create({
        controlsDisabled,
        currentPiece,
        level,
        gameOver,
        nextPiece,
        rowsCleared,
        score,
        startPosition,
        state,
        tStart,
        tLength
    });
}

Game.checkCoords = (state, coordList) => {
    for (let coord of coordList) {
        if (
            coord[0] < 0 ||
            coord[0] >= constants.numCols ||
            coord[1] >= constants.numRows
        ) {
            if (constants.logState && constants.logLevel !== "stateOnly") {
                console.log("Move failed");
            }
            return false;
        }
        if (state[coord[1]][coord[0]] === 1) {
            if (constants.logState && constants.logLevel !== "stateOnly") {
                console.log("Move failed");
            }
            return false;
        }
    }
    return true;
};

Game.checkForGameOver = state => {
    for (let row of state.slice(0, 4)) {
        if (row.some(el => el === 1)) {
            return true;
        }
    }
    return false;
};

Game.directions = {
    LEFT: "left",
    RIGHT: "right",
    DOWN: "down",
    CW: "clockwise",
    CCW: "counter-clockwise"
};

Game.gameLoop = (game, ui, tFrame) => {
    if (game.gameOver) {
        console.log("Game Over! Thanks for playing!");
        return;
    }

    if (!game.tStart) {
        game.tStart = tFrame;
    } else if (tFrame - game.tStart > game.tLength) {
        game.tStart += game.tLength;

        // cause block to drop every tLength ms
        const result = Game.tryMove(
            game.currentPiece,
            game.state,
            Game.directions.DOWN
        );

        if (result) {
            if (constants.logState && constants.logLevel !== "stateOnly") {
                console.log(`Piece fell to ${result[0]}`);
            }

            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                undefined,
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );

            game.currentPiece.position = result[0];

            UI.notifyBoxUpdates(ui, result[1], [
                game.currentPiece.color.active,
                constants.cssClasses.ACTIVE_BLOCK
            ]);
        } else {
            if (constants.logState && constants.logLevel !== "stateOnly") {
                console.log("Piece hit bottom");
            }
            let newState = Game.updateState(
                game.state,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                )
            );
            let clearedRowIndices;
            [game.state, clearedRowIndices] = Game.clearCompleteRows(newState);
            UI.notifyClearedRows(ui, clearedRowIndices);
            game.rowsCleared += clearedRowIndices.length;
            game.score += clearedRowIndices.length ** 2 * 100;

            game.level =
                Math.floor(game.rowsCleared / constants.rowsPerSpeedIncrease) +
                1;
            game.tLength = Math.pow(0.85, game.level - 1) * 1000;
            console.log(`Level: ${game.level}, tick length: ${game.tLength}`);

            UI.notifyScoreUpdate(ui, game.rowsCleared, game.score);
            game.gameOver = Game.checkForGameOver(game.state);

            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                [
                    game.currentPiece.color.fixed,
                    constants.cssClasses.FIXED_BLOCK
                ],
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );

            if (!game.gameOver) {
                game.currentPiece = game.nextPiece;
                game.nextPiece = Piece.getRandomPiece(game.startPosition);
                UI.notifyPreviewUpdate(ui, game.nextPiece);
            }
        }
    }
    window.requestAnimationFrame(Game.gameLoop.bind(null, game, ui));
};

Game.getAbsoluteCoords = (position, shape) => {
    const coordList = [];
    for (let i = 0; i < 4; i++) {
        coordList.push([shape[i][0] + position[0], shape[i][1] + position[1]]);
    }
    return coordList;
};

// Setting up keypress handling:
Game.handleInput = (game, ui, input) => {
    if (constants.logState && constants.logLevel !== "stateOnly") {
        console.log(input);
    }

    if (game.controlsDisabled) {
        return;
    }

    var moveResult;
    switch (input) {
        case Game.directions.LEFT:
            moveResult = Game.tryMove(
                game.currentPiece,
                game.state,
                Game.directions.LEFT
            );
            if (!moveResult) return;

            // TODO reduce linkage between Game and UI here
            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                undefined,
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(moveResult[0], game.currentPiece.shape),
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            game.currentPiece.position = moveResult[0];
            break;
        case Game.directions.DOWN:
            moveResult = Game.tryMove(
                game.currentPiece,
                game.state,
                Game.directions.DOWN
            );
            if (moveResult) {
                UI.notifyBoxUpdates(
                    ui,
                    Game.getAbsoluteCoords(
                        game.currentPiece.position,
                        game.currentPiece.shape
                    ),
                    undefined,
                    [
                        game.currentPiece.color.active,
                        constants.cssClasses.ACTIVE_BLOCK
                    ]
                );
                UI.notifyBoxUpdates(
                    ui,
                    Game.getAbsoluteCoords(
                        moveResult[0],
                        game.currentPiece.shape
                    ),
                    [
                        game.currentPiece.color.active,
                        constants.cssClasses.ACTIVE_BLOCK
                    ]
                );
                game.currentPiece.position = moveResult[0];
            } else {
                if (constants.logState && constants.logLevel !== "stateOnly") {
                    console.log("Piece hit bottom");
                }
                let newState = Game.updateState(
                    game.state,
                    Game.getAbsoluteCoords(
                        game.currentPiece.position,
                        game.currentPiece.shape
                    )
                );
                let clearedRowIndices;
                [game.state, clearedRowIndices] = Game.clearCompleteRows(
                    newState
                );
                UI.notifyClearedRows(ui, clearedRowIndices);
                game.rowsCleared += clearedRowIndices.length;
                game.score += clearedRowIndices.length ** 2 * 100;

                game.level =
                    Math.floor(
                        game.rowsCleared / constants.rowsPerSpeedIncrease
                    ) + 1;
                game.tLength = Math.pow(0.85, game.level - 1) * 1000;

                UI.notifyScoreUpdate(ui, game.rowsCleared, game.score);
                game.gameOver = Game.checkForGameOver(game.state);
                UI.notifyBoxUpdates(
                    ui,
                    Game.getAbsoluteCoords(
                        game.currentPiece.position,
                        game.currentPiece.shape
                    ),
                    [
                        game.currentPiece.color.fixed,
                        constants.cssClasses.FIXED_BLOCK
                    ],
                    [
                        game.currentPiece.color.active,
                        constants.cssClasses.ACTIVE_BLOCK
                    ]
                );

                if (!game.gameOver) {
                    game.currentPiece = game.nextPiece;
                    game.nextPiece = Piece.getRandomPiece(game.startPosition);
                    UI.notifyPreviewUpdate(ui, game.nextPiece);
                }
            }
            break;
        case Game.directions.RIGHT:
            moveResult = Game.tryMove(
                game.currentPiece,
                game.state,
                Game.directions.RIGHT
            );
            if (!moveResult) return;

            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                undefined,
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(moveResult[0], game.currentPiece.shape),
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            game.currentPiece.position = moveResult[0];
            break;
        case Game.directions.CCW:
            moveResult = Game.tryRotate(
                game.currentPiece,
                game.state,
                Game.directions.CCW
            );
            if (!moveResult) return;
            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                undefined,
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            UI.notifyBoxUpdates(ui, moveResult[1], [
                game.currentPiece.color.active,
                constants.cssClasses.ACTIVE_BLOCK
            ]);
            game.currentPiece.rotationIndex = moveResult[0];
            game.currentPiece.shape =
                game.currentPiece.rotationSet[moveResult[0]];
            break;
        case Game.directions.CW:
            moveResult = Game.tryRotate(
                game.currentPiece,
                game.state,
                Game.directions.CW
            );
            if (!moveResult) return;
            UI.notifyBoxUpdates(
                ui,
                Game.getAbsoluteCoords(
                    game.currentPiece.position,
                    game.currentPiece.shape
                ),
                undefined,
                [
                    game.currentPiece.color.active,
                    constants.cssClasses.ACTIVE_BLOCK
                ]
            );
            UI.notifyBoxUpdates(ui, moveResult[1], [
                game.currentPiece.color.active,
                constants.cssClasses.ACTIVE_BLOCK
            ]);
            game.currentPiece.rotationIndex = moveResult[0];
            game.currentPiece.shape =
                game.currentPiece.rotationSet[moveResult[0]];
            break;
    }
};

Game.logState = state => {
    console.log("Game state:");
    for (let i = 0; i < state.length; i++) {
        console.log(`[${state[i].toString()}] ${i}`);
    }
};

Game.clearCompleteRows = state => {
    const newState = [...state];
    const clearedRowIndices = [];

    for (let i = newState.length - 1; i >= 0; i--) {
        if (newState[i].every(el => el !== 0)) {
            newState.splice(i, 1);
            clearedRowIndices.unshift(i);
        }
    }

    for (let i = 0; i < clearedRowIndices.length; i++) {
        const newRow = [];
        for (let i = 0; i < constants.numCols; i++) {
            newRow.push(0);
        }
        newState.unshift(newRow);
    }

    return [newState, clearedRowIndices];
};

Game.startLoop = (game, ui) => {
    window.requestAnimationFrame(Game.gameLoop.bind(null, game, ui));
};

Game.tryMove = (piece, state, direction) => {
    var newPos;
    switch (direction) {
        case Game.directions.LEFT:
            newPos = [piece.position[0] - 1, piece.position[1]];
            break;
        case Game.directions.RIGHT:
            newPos = [piece.position[0] + 1, piece.position[1]];
            break;
        case Game.directions.DOWN:
            newPos = [piece.position[0], piece.position[1] + 1];
            break;
        default:
            return null;
    }
    const newCoords = Game.getAbsoluteCoords(newPos, piece.shape);
    return Game.checkCoords(state, newCoords) ? [newPos, newCoords] : null;
};

Game.tryRotate = (piece, state, direction) => {
    var newRotationIndex;
    var newShape;
    switch (direction) {
        case Game.directions.CCW:
            newRotationIndex =
                (piece.rotationIndex + 1) % piece.rotationSet.length;

            newShape = piece.rotationSet[newRotationIndex];
            break;
        case Game.directions.CW:
            newRotationIndex =
                (piece.rotationIndex + piece.rotationSet.length - 1) %
                piece.rotationSet.length;
            newShape = piece.rotationSet[newRotationIndex];
            break;
        default:
            return null;
    }
    const newCoords = Game.getAbsoluteCoords(piece.position, newShape);
    return Game.checkCoords(state, newCoords)
        ? [newRotationIndex, newCoords]
        : null;
};

Game.updateState = (state, coordList) => {
    const newState = [];
    for (let i = 0; i < constants.numRows; i++) {
        newState.push([]);
        for (let j = 0; j < constants.numCols; j++) {
            let offset = i - constants.numRows + state.length;
            if (offset < 0) {
                newState[i].push(0);
            } else {
                newState[i].push(state[offset][j]);
            }
        }
    }
    if (coordList) {
        for (let coords of coordList) {
            newState[coords[1]][coords[0]] = 1;
        }
    }
    if (constants.logState) Game.logState(newState);
    return newState;
};

function UI() {
    // Initialize array to track elements that need to be updated:
    const dirtyElements = [];

    // Initialize array of eventListener functions, so that they can
    // be cleaned up when game is restarted:
    const listeners = [];

    // Get the play area element:
    const playArea = document.querySelector(".play-area");

    // Get the preview element:
    const previewArea = document.querySelector(".next-piece-preview");

    // Get the scoreboard element:
    const scoreboard = document.querySelector(".scoreboard");

    return Object.create({
        dirtyElements,
        listeners,
        playArea,
        previewArea,
        scoreboard
    });
}

UI.cssClassMap = {};

UI.keyBindings = {
    a: Game.directions.LEFT,
    s: Game.directions.DOWN,
    d: Game.directions.RIGHT,
    q: Game.directions.CCW,
    e: Game.directions.CW
};

UI.handleKeyPress = (game, ui, event) => {
    if (game.controlsDisabled) {
        return;
    }

    var key = event.key || event.keyCode;
    key = key.toLowerCase();
    const input = UI.keyBindings[key] || null;
    if (input) {
        console.log(key, input);
        Game.handleInput(game, ui, input);
    } else {
        console.log(key);
    }
};

UI.cleanUpListeners = listeners => {
    for (let listener of listeners) {
        listener.element.removeEventListener(listener.type, listener.func);
    }
};

UI.clearRows = (ui, rowIndices) => {
    for (let rowIndex of rowIndices) {
        let row = ui.playArea.children[rowIndex];

        for (let child of row.children) {
            child.classList.add("tetris-box-disappear");
        }

        const removeFunc = () => {
            row.remove();
            ui.playArea.insertBefore(UI.newUIRow(), ui.playArea.firstChild);
            for (let i = 0; i < ui.playArea.children.length; i++) {
                if (i < 4) {
                    ui.playArea.children[i].classList.add("tetris-hidden-row");
                } else {
                    ui.playArea.children[i].classList.remove(
                        "tetris-hidden-row"
                    );
                }
            }
        };
        setTimeout(
            window.requestAnimationFrame(removeFunc),
            constants.initialTickLength
        );
    }
};

UI.initialize = (ui, game) => {
    ui.playArea.innerHTML = "";
    for (let j = 0; j < constants.numRows; j++) {
        let row = document.createElement("div");
        row.classList.add("tetris-row");

        // Make first four rows invisible:
        if (j < 4) {
            row.classList.add("tetris-hidden-row");
        }

        for (let i = 0; i < constants.numCols; i++) {
            let box = document.createElement("div");
            box.classList.add("tetris-box");

            if (game.state[j][i] === 1) {
                box.classList.add("tetris-red-fixed-block");
            }

            row.appendChild(box);
        }
        ui.playArea.appendChild(row);
    }

    ui.previewArea.innerHTML = "";
    for (let j = 0; j < 6; j++) {
        let row = document.createElement("div");
        row.classList.add("tetris-row");
        for (let i = 0; i < 6; i++) {
            let box = document.createElement("div");
            box.classList.add("tetris-preview-box");
            row.appendChild(box);
        }
        ui.previewArea.appendChild(row);
    }
    UI.notifyPreviewUpdate(ui, game.nextPiece);

    UI.notifyScoreUpdate(ui, 0, 0);

    const keyPressFunc = UI.handleKeyPress.bind(null, game, ui);
    ui.listeners.push({
        element: document,
        func: keyPressFunc,
        type: "keypress"
    });
    document.addEventListener("keypress", keyPressFunc);
};

UI.initializeRestartButton = restartFunc => {
    const restartButton = document.querySelector(".restart-container button");
    restartButton.addEventListener("click", restartFunc);
};

UI.newUIRow = () => {
    const row = document.createElement("div");
    row.classList.add("tetris-row");

    for (let i = 0; i < constants.numCols; i++) {
        let box = document.createElement("div");
        box.classList.add("tetris-box");
        row.appendChild(box);
    }
    return row;
};

UI.notifyClearedRows = (ui, rowIndices) => {
    window.requestAnimationFrame(UI.clearRows.bind(null, ui, rowIndices));
};

UI.notifyBoxUpdates = (ui, coordList, classesToAdd, classesToRemove) => {
    for (let coords of coordList) {
        let el = ui.playArea.children[coords[1]].children[coords[0]];
        ui.dirtyElements.push([el, classesToAdd, classesToRemove]);
    }
    window.requestAnimationFrame(
        UI.processDirtyElements.bind(null, ui.dirtyElements)
    );
};

UI.notifyPreviewUpdate = (ui, nextPiece) => {
    let lastEls = document.querySelectorAll(
        `.${constants.cssClasses.PREVIEW_AREA} .${
            constants.cssClasses.ACTIVE_BLOCK
        }`
    );
    console.log(`lastEls has length ${lastEls.length}`);
    for (let el of lastEls) {
        ui.dirtyElements.push([
            el,
            null,
            [constants.cssClasses.ACTIVE_BLOCK, ...constants.activeColorArray]
        ]);
    }

    let nextPiecePosition = [1, 0];
    if (
        nextPiece.rotationSet === constants.zRotations ||
        nextPiece.rotationSet === constants.sRotations
    ) {
        nextPiecePosition = [1, 0];
    } else if (
        nextPiece.rotationSet === constants.iRotations ||
        nextPiece.rotationSet === constants.lRotations ||
        nextPiece.rotationSet === constants.jRotations ||
        nextPiece.rotationSet === constants.tRotations
    ) {
        nextPiecePosition = [1, 1];
    }
    const nextPieceCoords = Game.getAbsoluteCoords(
        nextPiecePosition,
        nextPiece.rotationSet[0]
    );
    for (let coords of nextPieceCoords) {
        let el = ui.previewArea.children[coords[1]].children[coords[0]];
        ui.dirtyElements.push([
            el,
            [nextPiece.color.active, constants.cssClasses.ACTIVE_BLOCK]
        ]);
    }

    window.requestAnimationFrame(
        UI.processDirtyElements.bind(null, ui.dirtyElements)
    );
};

UI.notifyScoreUpdate = (ui, rowsCleared, score) => {
    ui.scoreboard.children[0].textContent = `Score: ${score}`;
    ui.scoreboard.children[1].textContent = `Rows Cleared: ${rowsCleared}`;
};

UI.processDirtyElements = dirtyElements => {
    while (dirtyElements.length > 0) {
        const [el, classesToAdd, classesToRemove] = dirtyElements.shift();
        if (classesToAdd) el.classList.add(...classesToAdd);
        if (classesToRemove) el.classList.remove(...classesToRemove);
    }
};

(function runTetris() {
    console.log("Starting game!");
    var ui = UI();
    // var game = Game(test.stateDescriptions.SINGLE_LINE_CLEAR);
    var game = Game();
    UI.initialize(ui, game);
    Game.startLoop(game, ui);

    function restartGame() {
        ui.dirtyElements = [];
        UI.cleanUpListeners(ui.listeners);
        game.gameOver = true;
        setTimeout(() => {
            ui = UI();
            game = Game();
            UI.initialize(ui, game);
            Game.startLoop(game, ui);
        }, 200);
    }

    UI.initializeRestartButton(restartGame);
})();
