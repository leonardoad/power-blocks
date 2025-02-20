<template>
    <div class="game-board">
        <h1>Block Blast!</h1>
        <div class="score-board">
            <div>High Score: {{ highScore }}</div>
            <h3>Score: {{ score }}</h3>
        </div>
        <!-- Add your game board elements here -->
        <div class="grid" @dragover.prevent @drop="handleDrop" ref="gameBoard">
            <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                <div class="cell" :class="{'filled-cell': block}" v-for="(block, blockIndex) in row" :key="blockIndex" :style="applyCellStyle(block)">
                </div>
            </div>
        </div>
        <div class="shape-selection">
            <div v-for="(shape, index) in currentShapes" :key="index">
                <Block :shape="shapes[shape]" :name="shape" :index="index" @shapeClicked="handleShapeClicked" @shapeDragged="handleShapeDragged" @shapeDropped="handleShapeDropped" />
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
                l5:[
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
                    [1, 1, 1, 1],
                    [1, 1, 1, 1]
                ]

            },
            currentShapes: [],
            selectedShape: '',
            gameOver: false,
            score: 0,
            highScore: 0,
        };
    },
    methods: {
        resetBoard() {
            this.board = Array.from({ length: 8 }, () => Array(8).fill(null));
            this.getRandomShapes();
            this.gameOver = false;
            this.highScore = Math.max(this.highScore, this.score);
            localStorage.setItem('highScore', this.highScore);
            this.score = 0;
        },
        addShape(shape, row, col) {
            if(this.checkCollision(shape, row, col))
                return;
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.board[row + i][col + j] = this.selectedShapeColor;
                    }
                }
            }
            this.removeShape(this.selectedShape);
            setTimeout(() => {
                this.checkRows();
                this.checkColumns();
            }, 500);
            this.checkGameOver();
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
                    this.board.splice(i, 1, Array(8).fill(null));
                    this.score += 10;
                }
            }
        },
        checkColumns() {
            for (let i = 0; i < this.board[0].length; i++) {
                if (this.board.every(row => row[i] !== null)) {
                    this.board.forEach(row => row[i] = null);
                    this.score += 10;
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
            this.gameOver = true;
            return true;
        },
        handleShapeClicked(event) {
            this.selectedShape = event.name; // get the shape name from event
            this.selectedShapeColor = event.color; // store color for future use
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
        },
        applyCellStyle(block) {
            if (block !== null) {
                return {
                    background: `linear-gradient(145deg, ${block}, ${block} 50%, ${block} 50%, ${block} 100%)`,
                };
            }
            return {};
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

