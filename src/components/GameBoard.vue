<template>
    <div class="game-board">
        <div class="title">Power Blocks!!</div>
        <ScoreBoard :highScore="highScore" :scoreDisplay="scoreDisplay" :isHighScoreAnimated="isHighScoreAnimated" />
        <div class="grid-container">
            <GameGrid :board="board" :hoverCells="hoverCells" @dragover="handleDragOver" @drop="handleDrop"
                ref="gameBoard" />
            <!-- Score animations -->
            <div v-for="animation in scoreAnimations" :key="animation.id" class="score-animation"
                :style="getAnimationStyle(animation)">
                +{{ animation.points }} <br> <span class="score-text">{{ animation.text }}</span>
            </div>
        </div>
        <ShapeSelection :shapes="shapes" :currentShapes="currentShapes" @shapeClicked="handleShapeClicked"
            @shapeDragged="handleShapeDragged" @shapeDropped="handleShapeDropped" />

        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-message">Game Over!</div>
            <button @click="resetBoard" class="restart-button">Restart</button>
            <button @click="undoMove" class="back-button" v-if="history.length > 0">Back</button>
        </div>

        <button @click="undoMove" class="back-button" v-if="history.length > 0">Back</button>
        <button @click="openCustomPieceCreator" class="create-piece-button">Create Your Custom Piece</button>
        <button @click="openSelectShapes" class="open-select-shapes-button">Select Shapes</button>

        <CustomPieceCreator :visible="isCustomPieceCreatorVisible" @save="handleCustomPieceSave"
            @cancel="handleCustomPieceCancel" />
        <SelectShapes :visible="isSelectShapesVisible" :shapes="shapes" :initialSelectedShapes="selectedShapes"
            @save="handleSelectShapesSave" @cancel="handleSelectShapesCancel" />
    </div>
</template>

<script>
import ScoreBoard from './ScoreBoard.vue';
import GameGrid from './GameGrid.vue';
import ShapeSelection from './ShapeSelection.vue';
import CustomPieceCreator from './CustomPieceCreator.vue';
import SelectShapes from './SelectShapes.vue';

import './GameBoard.css';
export default {
    components: { CustomPieceCreator, GameGrid, ScoreBoard, ShapeSelection, SelectShapes },
    name: 'GameBoard',
    data() {
        return {
            board: Array.from({ length: 8 }, () => Array(8).fill(null)),
            shapes: {
                square: [
                    [1, 1],
                    [1, 1]
                ],
                line: [
                    [1, 1, 1, 1, 1]
                ],
                line2: [
                    [1],
                    [1],
                    [1],
                    [1],
                    [1]
                ],
                line3: [
                    [1, 1, 1]
                ],
                line4: [
                    [1, 1]
                ],
                line5: [
                    [1],
                    [1],
                    [1]
                ],
                line6: [
                    [1],
                    [1]
                ],
                t: [
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                t2: [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ],
                t3: [
                    [0, 1, 0],
                    [1, 1, 1]
                ],
                t4: [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ],
                single: [
                    [1]
                ],
                l: [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ],
                l2: [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ],
                l3: [
                    [1, 1],
                    [1, 0],
                    [1, 0]
                ],
                l4: [
                    [1, 1, 1],
                    [0, 0, 1],
                ],
                l5: [
                    [1, 1, 1],
                    [1, 0, 0],
                ],
                j: [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ],
                s: [
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                z: [
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                bCorner: [
                    [1, 1, 1],
                    [1, 0, 0],
                    [1, 0, 0]
                ],
                bCorner2: [
                    [0, 0, 1],
                    [0, 0, 1],
                    [1, 1, 1]
                ],
                bCorner3: [
                    [1, 0, 0],
                    [1, 0, 0],
                    [1, 1, 1]
                ],
                bCorner4: [
                    [1, 1, 1],
                    [0, 0, 1],
                    [0, 0, 1]
                ],
                bSquare: [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1]
                ],
                rectangle: [
                    [1, 1, 1],
                    [1, 1, 1]
                ],
                rectangle2: [
                    [1, 1],
                    [1, 1],
                    [1, 1]
                ],
                corner: [
                    [1, 1],
                    [0, 1]
                ],
                corner2: [
                    [1, 0],
                    [1, 1]
                ],
                corner3: [
                    [0, 1],
                    [1, 1]
                ],
                corner4: [
                    [1, 1],
                    [1, 0]
                ],
                u: [
                    [1, 0, 1],
                    [1, 1, 1]
                ],
                u2: [
                    [1, 1, 1],
                    [1, 0, 1]
                ],
                u3: [
                    [1, 1],
                    [0, 1],
                    [1, 1]
                ],
                u4: [
                    [1, 1],
                    [1, 0],
                    [1, 1]
                ],

            },
            //powers: ['bomb', 'fill-bomb', 'remove-row', 'remove-column', 'fill-row', 'fill-column', 'cross-bomb','cross-fill', 'fill-all'],
            powers: ['fill-all', 'fill-bomb', 'fill-row', 'fill-column', 'cross-fill'],
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
            currentShapes: [],
            selectedShape: {
                name: '',
                color: '',
                power: '',
                id: ''
            },
            selectedShapeColor: '',
            selectedShapePower: '',
            gameOver: false,
            score: 0,
            scoreDisplay: 0,
            highScore: 0,
            isHighScoreAnimated: false,
            hoverCells: [],
            history: [], // Add history array
            isCustomPieceCreatorVisible: false, // Add visibility state for custom piece creator
            isSelectShapesVisible: false, // Add visibility state for select shapes
            selectedShapes: [], // Add selected shapes array
            combo: 0, // Add combo counter
            rowsOrColumnsCompleted: false, // Track if any rows/columns were completed in the current round
            scoreAnimations: [], // Track score animations
        };
    },
    watch: {
        score(newValue, oldValue) {
            this.incrementScoreDisplay(newValue, oldValue);
            if (newValue > this.highScore) {
                this.animateHighScore();
            }
        }
    },
    methods: {
        incrementScoreDisplay(newValue, oldValue) {
            if (newValue > oldValue) {
                let increment = 1;
                if (newValue - oldValue > 50) {
                    increment = 10;
                } else if (newValue - oldValue > 10) {
                    increment = 5;
                }
                const interval = setInterval(() => {
                    this.scoreDisplay += increment;
                    if (this.scoreDisplay >= this.score) {
                        this.scoreDisplay = this.score;
                        clearInterval(interval);
                    }
                }, 1);
            } else {
                this.scoreDisplay = this.score;
            }
        },
        animateHighScore() {
            this.isHighScoreAnimated = true;
            setTimeout(() => {
                this.isHighScoreAnimated = false;
            }, 1000); // Duration of the animation
        },
        resetBoard() {
            this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
            this.gameOver = false;
            this.highScore = Math.max(this.score, this.highScore);
            this.score = 0;
            this.combo = 0;
            this.rowsOrColumnsCompleted = false;
            this.history = []; // Clear history on reset
            this.getRandomShapes();
            this.saveState();
        },
        addShape(shape, row, col) {
            if (this.checkCollision(shape, row, col)) return;
            this.saveHistory();

            let shapeBlocks = 0;
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.board[row + i][col + j] = this.selectedShape.color;
                        shapeBlocks++;
                    }
                }
            }
            this.score += shapeBlocks; // Points for placing the shape
            this.removeShape(this.selectedShape);

            if (this.selectedShape.power) {
                this.applyPowerEffect(this.selectedShape.power, row, col);
            }

            let { completedRows, rowPositions } = this.checkRows();
            let { completedColumns, colPositions } = this.checkColumns();
            let totalCompleted = completedRows + completedColumns;

            if (totalCompleted > 0) {
                this.combo++;
                const rowPoints = completedRows * 10; // Points for completed rows/columns
                const colPoints = completedColumns * 10; // Points for completed columns
                const rowColPoints = totalCompleted * 10; // Points for completed rows/columns
                const multiBonus = totalCompleted > 1 ? totalCompleted * 10 : 0; // Bonus for multiple rows/columns
                const comboBonus = this.combo * 10; // Combo bonus
                const totalPoints = rowColPoints + multiBonus + comboBonus;

                this.score += totalPoints;
                this.rowsOrColumnsCompleted = true; // Mark that rows/columns were completed

                // Show score animations for completed rows
                if (completedRows > 0) {
                    if (multiBonus + comboBonus > 0) {
                        this.showScoreAnimation(multiBonus + comboBonus, rowPositions[0], 0, true, "Combo");
                    } else {
                        this.showScoreAnimation(rowPoints, rowPositions[0], 0, true, "Good");
                    }
                }

                // Show score animations for completed columns
                if (completedColumns > 0) {
                    if (multiBonus + comboBonus > 0) {
                        this.showScoreAnimation(multiBonus + comboBonus, 0, colPositions[0], false, "Combo");
                    } else {
                        this.showScoreAnimation(colPoints, 0, colPositions[0], false, "Good");
                    }
                }

            }
            
            this.updateBoard(rowPositions, colPositions);


            
            if (this.currentShapes.length === 0) {
                if (!this.rowsOrColumnsCompleted) {
                    this.combo = 0; // Reset combo if no rows/columns were completed in the last play of the round
                }
                
                setTimeout(() => {
                    this.getRandomShapes();
                }, 600); // Delay to allow the animations to complete

            }
            setTimeout(() => {

                this.gameOver = this.checkGameOver();
                this.saveState(); // Save the current state after adding the shape
            }, 1000); // Delay to allow the animations to complete

        },
        updateBoard(rowPositions, colPositions) {
            rowPositions.forEach(row => {
                this.removeRow(row);
            });
            colPositions.forEach(col => {
                this.removeColumn(col);
            });
            
            setTimeout(() => {
                if (this.checkBoardClear()) {
                    this.score += 300; // Bonus for clearing the board 
                    this.showScoreAnimation(300, 4, 4, true, "Clear");
                }
            }, 500); // Delay to allow the animations to complete
            
        },
        applyPowerEffect(power, row, col) {
            switch (power) {
                case 'bomb':
                    this.applyBombPower(row, col);
                    break;
                case 'fill-bomb':
                    this.applyFillBombPower(row, col);
                    break;
                case 'cross-bomb':
                    this.applyCrossBombPower(row, col);
                    break;
                case 'cross-fill':
                    this.applyCrossFillPower(row, col);
                    break;
                case 'fill-all':
                    this.applyFillAllPower();
                    break;
                case 'remove-row':
                    this.applyRemoveRowPower(row);
                    break;
                case 'remove-column':
                    this.applyRemoveColumnPower(col);
                    break;
                case 'fill-row':
                    this.applyFillRowPower(row);
                    break;
                case 'fill-column':
                    this.applyFillColumnPower(col);
                    break;
            }
        },
        applyBombPower(row, col) {
            for (let i = row - 1; i <= row + 1; i++) {
                for (let j = col - 1; j <= col + 1; j++) {
                    if (this.board[i] && this.board[i][j] !== undefined) {
                        this.board[i][j] = null;
                    }
                }
            }
        },
        applyCrossBombPower(row, col) {
            for (let i = 0; i < this.board.length; i++) {
                this.board[i][col] = null;
            }
            for (let j = 0; j < this.board[0].length; j++) {
                this.board[row][j] = null;
            }
        },
        applyFillAllPower() {
            this.board = this.board.map(row => row.map(cell => (cell === null ? this.selectedShape.color : cell)));
        },
        applyCrossFillPower(row, col) {
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i][col] === null) {
                    this.board[i][col] = this.selectedShape.color;
                }
            }
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[row][j] === null) {
                    this.board[row][j] = this.selectedShape.color;
                }
            }
        },
        applyFillBombPower(row, col) {
            for (let i = row - 1; i <= row + 1; i++) {
                for (let j = col - 1; j <= col + 1; j++) {
                    if (this.board[i] && this.board[i][j] !== undefined) {
                        if (this.board[i][j] === null) {
                            this.board[i][j] = this.selectedShape.color;
                        }
                    }
                }
            }
        },
        applyRemoveRowPower(row) {
            this.removeRow(row);
        },
        applyFillRowPower(row) {
            this.board[row] = this.board[row].map(cell => (cell === null ? this.selectedShape.color : cell));
        },
        applyFillColumnPower(col) {
            this.board.forEach(row => row[col] = row[col] === null ? this.selectedShape.color : row[col]);
        },
        applyRemoveColumnPower(col) {
            this.removeColumn(col);
        },
        checkBoardClear() {
            return this.board.every(row => row.every(block => block === null));
        },
        checkCollision(shape, row, col) {
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        if (this.board[row + i] === undefined || this.board[row + i][col + j] === undefined || this.board[row + i][col + j] !== null) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        checkRows() {
            let rowPositions = [];
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i].every(block => block !== null)) {
                    rowPositions.push(i);
                }
            }
            return { completedRows: rowPositions.length, rowPositions };
        },
        removeRow(row) {
            this.board[row].forEach((block, index) => {
                setTimeout(() => {
                    this.board[row].splice(index, 1, null);
                }, index * 10);
            });
        },
        checkColumns() {
            let colPositions = [];
            for (let i = 0; i < this.board[0].length; i++) {
                if (this.board.every(row => row[i] !== null)) {
                    colPositions.push(i);
                }
            }
            return { completedColumns: colPositions.length, colPositions };
        },
        removeColumn(col) {
            this.board.forEach((row, index) => {
                setTimeout(() => {
                    this.board[index].splice(col, 1, null);
                }, index * 10);
            });
        },
        checkGameOver() {
            //the game is over when there is no space available for the next shape
            for (let shape of this.currentShapes) {
                for (let row = 0; row <= this.board.length - this.shapes[shape.name].length; row++) {
                    for (let col = 0; col <= this.board[0].length - this.shapes[shape.name][0].length; col++) {
                        if (!this.checkCollision(this.shapes[shape.name], row, col)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        handleShapeClicked(event) {
            this.selectedShape = { name: event.name, color: event.color, power: event.power, id: event.id }; // store shape details
        },
        handleShapeDragged(event) {
            const offsetX = parseFloat(event.offsetX);
            const offsetY = parseFloat(event.offsetY);
            const boardRect = this.$refs.gameBoard.$el.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation

            this.updateHoverCells(this.shapes[this.selectedShape.name], row, col);
        },
        handleShapeDropped(event) {
            const offsetX = parseFloat(event.offsetX);
            const offsetY = parseFloat(event.offsetY);
            const boardRect = this.$refs.gameBoard.$el.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation

            this.addShape(this.shapes[this.selectedShape.name], row, col);
            this.clearHoverCells();
        },
        handleDrop(event) {
            const name = event.dataTransfer.getData('name');
            if (!name) return;
            const offsetX = parseFloat(event.dataTransfer.getData('offsetX'));
            const offsetY = parseFloat(event.dataTransfer.getData('offsetY'));
            const boardRect = this.$refs.gameBoard.$el.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation
            this.addShape(this.shapes[name], row, col);
            this.clearHoverCells();
        },
        removeShape(shape) {
            const index = this.currentShapes.findIndex(s => s.id === shape.id);
            if (index > -1) {
                this.currentShapes.splice(index, 1);
            }
        },
        getRandomShapes() {
            //select 3 random shapes from the shapes object and add to the currentShapes array the shapes can be repeated
            this.currentShapes = Array.from({ length: 3 }, () => {
                const shapeName = this.selectedShapes[Math.floor(Math.random() * this.selectedShapes.length)];
                return { name: shapeName, id: Date.now() + Math.random() };
            });

            this.currentShapes.forEach(shape => {
                shape.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            });

            this.currentShapes.forEach(shape => {
                if (shape.name === 'single') {
                    shape.power = this.powers[Math.floor(Math.random() * this.powers.length)];
                }
            });
            if (this.checkGameOver()) {
                this.getRandomShapes();
            }

            this.rowsOrColumnsCompleted = false; // Reset for the new round
        },
        applyCellStyle(block) {
            if (block !== null) {
                return {
                    background: `linear-gradient(145deg, ${block}, ${block} 50%, ${block} 50%, ${block} 100%)`,
                };
            }
            return {};
        },
        updateHoverCells(shape, row, col) {
            this.hoverCells = [];
            if (this.checkCollision(shape, row, col))
                return;
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.hoverCells.push({ row: row + i, col: col + j });
                    }
                }
            }
        },
        clearHoverCells() {
            this.hoverCells = [];
        },
        isHoverCell(row, col) {
            return this.hoverCells.some(cell => cell.row === row && cell.col === col);
        },
        saveHistory() {
            this.history.push({
                board: JSON.parse(JSON.stringify(this.board)),
                score: this.score,
                combo: this.combo,
                rowsOrColumnsCompleted: this.rowsOrColumnsCompleted,
                currentShapes: JSON.parse(JSON.stringify(this.currentShapes))
            });
        },
        saveState() {
            // Save the current state of the board and the score
            const state = {
                board: JSON.parse(JSON.stringify(this.board)),
                score: this.score,
                currentShapes: JSON.parse(JSON.stringify(this.currentShapes)),
                selectedShape: this.selectedShape,
                history: JSON.parse(JSON.stringify(this.history)),
                selectedShapes: this.selectedShapes,
                highScore: this.highScore,
                combo: this.combo,
                rowsOrColumnsCompleted: this.rowsOrColumnsCompleted
            };
            localStorage.setItem('gameState', JSON.stringify(state));
        },
        undoMove() {
            if (this.history.length > 0) {
                const previousState = this.history.pop();
                this.board = previousState.board;
                this.score = previousState.score;
                this.currentShapes = previousState.currentShapes;
                this.gameOver = false;
                this.combo = previousState.combo;
                this.rowsOrColumnsCompleted = previousState.rowsOrColumnsCompleted;
            }
        },
        openCustomPieceCreator() {
            this.isCustomPieceCreatorVisible = true;
        },
        handleCustomPieceSave(grid) {
            this.isCustomPieceCreatorVisible = false;
            const customShape = grid.map(row => row.map(cell => (cell ? 1 : 0)));
            this.shapes.custom = customShape;
            this.currentShapes.push({ name: 'custom', color: '#' + Math.floor(Math.random() * 16777215).toString(16) });
            this.saveState();
        },
        handleCustomPieceCancel() {
            this.isCustomPieceCreatorVisible = false;
        },
        openSelectShapes() {
            this.isSelectShapesVisible = true;
        },
        handleSelectShapesSave(selectedShapes) {
            this.isSelectShapesVisible = false;
            this.selectedShapes = selectedShapes;
            this.getRandomShapes();
            this.saveState();
        },
        handleSelectShapesCancel() {
            this.isSelectShapesVisible = false;
        },
        showScoreAnimation(points, row, col, isRow, text) {
            const animation = {
                points,
                row,
                col,
                isRow,
                text,
                id: Date.now() // Unique ID for each animation
            };
            this.scoreAnimations.push(animation);
            setTimeout(() => {
                this.scoreAnimations = this.scoreAnimations.filter(anim => anim.id !== animation.id);
            }, 2000); // Duration of the animation
        },
        getAnimationStyle(animation) {
            const size = 40; // Assuming each cell is 40x40 pixels
            const top = animation.isRow ? ((animation.row) * size) : size * 4;
            const left = animation.isRow ? size * 4 : ((animation.col + 1) * size);
            return {
                top: `${top}px`,
                left: `${left}px`,
                transition: 'transform 0.5s, opacity 0.5s',
                opacity: 1,
            };
        },
    },
    mounted() {

        const savedGameState = localStorage.getItem('gameState');
        if (savedGameState) {
            const state = JSON.parse(savedGameState);
            this.board = state.board;
            this.score = state.score;
            this.currentShapes = state.currentShapes;
            this.selectedShape = state.selectedShape;
            this.history = state.history;
            this.selectedShapes = state.selectedShapes;
            this.highScore = state.highScore;
            this.combo = state.combo;
            this.rowsOrColumnsCompleted = state.rowsOrColumnsCompleted;
        } else {
            this.selectedShapes = Object.keys(this.shapes);
            this.resetBoard();
        }

    }
}
</script>
