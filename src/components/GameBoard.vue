<template>
    <div class="game-board">
        <div class="title">Block Blast!</div>
        <ScoreBoard :highScore="highScore" :scoreDisplay="scoreDisplay" :isHighScoreAnimated="isHighScoreAnimated" />
        <div class="grid-container">
            <GameGrid :board="board" :hoverCells="hoverCells" @dragover="handleDragOver" @drop="handleDrop" ref="gameBoard" />
            <!-- Score animations -->
            <div v-for="animation in scoreAnimations" :key="animation.id" class="score-animation" :style="getAnimationStyle(animation)">
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

        <CustomPieceCreator :visible="isCustomPieceCreatorVisible" @save="handleCustomPieceSave" @cancel="handleCustomPieceCancel" />
        <SelectShapes :visible="isSelectShapesVisible" :shapes="shapes" :initialSelectedShapes="selectedShapes" @save="handleSelectShapesSave" @cancel="handleSelectShapesCancel" />
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
            currentShapes: [],
            selectedShape: '',
            selectedShapeColor: '',
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
            }else{
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
                        this.board[row + i][col + j] = this.selectedShapeColor;
                        shapeBlocks++;
                    }
                }
            }
            this.score += shapeBlocks; // Points for placing the shape
            this.removeShape(this.selectedShape);

            setTimeout(() => {
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
                        if(multiBonus + comboBonus > 0) {
                            this.showScoreAnimation(multiBonus + comboBonus, rowPositions[0], 0, true, "Combo");
                        } else {
                            this.showScoreAnimation(rowPoints, rowPositions[0], 0, true, "Good");
                        }
                    }

                    // Show score animations for completed columns
                    if(completedColumns > 0) {
                        if(multiBonus + comboBonus > 0) {
                            this.showScoreAnimation(multiBonus + comboBonus, 0, colPositions[0], false, "Combo");
                        } else {
                            this.showScoreAnimation(colPoints, 0, colPositions[0], false, "Good");
                        }
                    }
                    
                }
                setTimeout(() => {
                    if (this.checkBoardClear()) {
                        this.score += 300; // Bonus for clearing the board
                        this.showScoreAnimation(300, 4, 4, true, "Clear");
                    }
                }, 500);


                if (this.currentShapes.length === 0) {
                    if (!this.rowsOrColumnsCompleted) {
                        this.combo = 0; // Reset combo if no rows/columns were completed in the last play of the round
                    }
                    this.getRandomShapes();
                }

            }, 500);

            setTimeout(() => {
                this.gameOver = this.checkGameOver();
                this.saveState(); // Save the current state after removing the completed rows/columns
            }, 1000);
            
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
                    this.board[i].forEach((block, index) => {
                        setTimeout(() => {
                            this.board[i].splice(index, 1, null);
                        }, index * 10);
                    });
                }
            }
            return { completedRows: rowPositions.length, rowPositions };
        },
        checkColumns() {
            let colPositions = [];
            for (let i = 0; i < this.board[0].length; i++) {
                if (this.board.every(row => row[i] !== null)) {
                    this.board.forEach((block, index) => {
                        setTimeout(() => {
                            this.board[index].splice(i, 1, null);
                        }, index * 10);
                    });
                    colPositions.push(i);
                }
            }
            return { completedColumns: colPositions.length, colPositions };
        },
        checkGameOver() {
            //the game is over when there is no space available for the next shape
            for (let shape of this.currentShapes) {
                for (let row = 0; row <= this.board.length - this.shapes[shape].length; row++) {
                    for (let col = 0; col <= this.board[0].length - this.shapes[shape][0].length; col++) {
                        if (!this.checkCollision(this.shapes[shape], row, col)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        handleShapeClicked(event) {
            this.selectedShape = event.name; // get the shape name from event
            this.selectedShapeColor = event.color; // store color for future use
        },
        handleShapeDragged(event) {
            const offsetX = parseFloat(event.offsetX);
            const offsetY = parseFloat(event.offsetY);
            const boardRect = this.$refs.gameBoard.$el.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation

            this.updateHoverCells(this.shapes[this.selectedShape], row, col);
        },
        handleShapeDropped(event) {
            const offsetX = parseFloat(event.offsetX);
            const offsetY = parseFloat(event.offsetY);
            const boardRect = this.$refs.gameBoard.$el.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation

            this.addShape(this.shapes[this.selectedShape], row, col);
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
        removeShape(name) {
            const index = this.currentShapes.indexOf(name);
            if (index > -1) {
                this.currentShapes.splice(index, 1);
            }
        },
        getRandomShapes() {
            //select 3 random shapes from the shapes object and add to the currentShapes array the shapes can be repeated
            this.currentShapes = Array.from({ length: 3 }, () => {
                return this.selectedShapes[Math.floor(Math.random() * this.selectedShapes.length)];
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
                selectedShapeColor: this.selectedShapeColor,
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
            this.currentShapes.push('custom');
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
            const left = animation.isRow ? size * 4 : ((animation.col + 1)  * size);
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
            this.selectedShapeColor = state.selectedShapeColor;
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
