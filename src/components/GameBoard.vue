<template>
    <div class="game-board">
        <div class="title">Block Blast!</div>
        <div class="score-board">
            <div class="high-score">High Score: {{ highScore }}</div>
            <div class="score" :class="{ highlight: isHighScoreAnimated }">{{ scoreDisplay }}</div>
        </div>
        <!-- Add your game board elements here -->
        <div class="grid" @dragover.prevent="handleDragOver" @drop="handleDrop" ref="gameBoard">
            <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                <div class="cell" v-for="(block, blockIndex) in row" :key="blockIndex"
                    :class="{ 'filled-cell': block, 'hover-cell': isHoverCell(rowIndex, blockIndex) }"
                    :style="applyCellStyle(block)">
                </div>
            </div>
        </div>
        <div class="shape-selection">
            <div v-for="(shape, index) in currentShapes" :key="index">
                <Block :shape="shapes[shape]" :name="shape" :index="index" @shapeClicked="handleShapeClicked"
                    @shapeDragged="handleShapeDragged" @shapeDropped="handleShapeDropped" />
            </div>
        </div>

        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-message">Game Over!</div>
            <button @click="resetBoard" class="restart-button">Restart</button>
        </div>
    </div>
</template>

<script>
import Block from './Block.vue';
import './GameBoard.css';
export default {
    components: { Block },
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

            },
            currentShapes: [],
            selectedShape: '',
            selectedShapeColor: '',
            gameOver: false,
            score: 0,
            scoreDisplay: 0,
            highScore: 0,
            isHighScoreAnimated: false,
            hoverCells: []
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
            this.getRandomShapes();
            this.gameOver = false;
            this.highScore = Math.max(this.highScore, this.score);
            localStorage.setItem('highScore', this.highScore);
            this.score = 0;
        },
        addShape(shape, row, col) {
            if (this.checkCollision(shape, row, col))
                return;
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
            const boardRect = this.$refs.gameBoard.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation

            this.updateHoverCells(this.shapes[this.selectedShape], row, col);
        },
        handleShapeDropped(event) {
            const offsetX = parseFloat(event.offsetX);
            const offsetY = parseFloat(event.offsetY);
            const boardRect = this.$refs.gameBoard.getBoundingClientRect();
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
            const boardRect = this.$refs.gameBoard.getBoundingClientRect();
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
                return Object.keys(this.shapes)[Math.floor(Math.random() * Object.keys(this.shapes).length)];
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
        }
    },
    mounted() {
        const savedHighScore = localStorage.getItem('highScore');
        if (savedHighScore !== null) {
            this.highScore = parseInt(savedHighScore, 10);
        }
        this.resetBoard();
    }
}
</script>
