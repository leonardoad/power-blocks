<template>
    <div class="game-board">
        <div class="title">Block Blast!</div>
        <ScoreBoard :highScore="highScore" :scoreDisplay="scoreDisplay" :isHighScoreAnimated="isHighScoreAnimated" />
        <GameGrid :board="board" :hoverCells="hoverCells" @dragover="handleDragOver" @drop="handleDrop" ref="gameBoard" />
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
                    [1, 1, 1, 1]
                ],
                line2: [
                    [1],
                    [1],
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
            selectedShapes: [] // Add selected shapes array
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
            this.score = 0;
            this.history = []; // Clear history on reset
            this.getRandomShapes();
            this.saveState();
        },
        addShape(shape, row, col) {
            if (this.checkCollision(shape, row, col))
                return;
            this.saveHistory();
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.board[row + i][col + j] = this.selectedShapeColor;
                        this.score += 1;
                    }
                }
            }
            this.removeShape(this.selectedShape);

            setTimeout(() => {
                this.checkRows();
                this.checkColumns();
                setTimeout(() => {
                    this.gameOver = this.checkGameOver();
                }, 1000);
                
                this.saveState(); // Save the current state before adding the shape
            }, 500);
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
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i].every(block => block !== null)) {
                    this.board[i].forEach((block, index) => {
                        setTimeout(() => {
                            this.board[i].splice(index, 1, null);
                        }, index * 10);
                    });
                    this.score += 5 * 8;
                }
            }
        },
        checkColumns() {
            for (let i = 0; i < this.board[0].length; i++) {
                if (this.board.every(row => row[i] !== null)) {
                    this.board.forEach((block, index) => {
                        setTimeout(() => {
                            this.board[index].splice(i, 1, null);
                        }, index * 10);
                    });
                    this.score += 5 * 8;
                }
            }
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
            if (this.currentShapes.length === 0) {
                this.getRandomShapes();
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
        }
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
        } else {
            this.selectedShapes = Object.keys(this.shapes);
            this.resetBoard();
        }

    }
}
</script>

