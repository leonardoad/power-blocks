<template>
    <div class="game-board">
        <h2>Game Board</h2>
        <!-- Add your game board elements here -->
        <div class="grid" @dragover.prevent @drop="handleDrop" ref="gameBoard">
            <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                <div class="block" :class="{'filled-block': block}" v-for="(block, blockIndex) in row" :key="blockIndex">
                </div>
            </div>
        </div>
        <div class="shape-selection">
            <div v-for="(shape, index) in currentShapes" :key="index">
                <Block :shape="shapes[shape]" :name="shape" :index="index" @shapeClicked="handleShapeClicked" />
            </div>
        </div>
    </div>
</template>

<script>
import Block from './Block.vue';
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
                t: [
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                l: [
                    [1, 0],
                    [1, 0],
                    [1, 1]
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
            selectedShape: ''
        };
    },
    methods: {
        initializeBoard() {
            this.getRandomShapes();
        },
        resetBoard() {
            this.initializeBoard();
        },
        addShape(shape, row, col) {
            if(this.checkCollision(shape, row, col))
                return;
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.board[row + i][col + j] = 'X';
                    }
                }
            }
            this.removeShape(this.selectedShape);
            this.checkRows();
            this.checkColumns();

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
                if (this.board[i].every(block => block === 'X')) {
                    this.board.splice(i, 1, Array(8).fill(null));
                }
            }
        },
        checkColumns() {
            for (let i = 0; i < this.board[0].length; i++) {
                if (this.board.every(row => row[i] === 'X')) {
                    this.board.forEach(row => row[i] = null);
                }
            }
        },
        handleShapeClicked(event) {
            this.selectedShape = event; // get the shape name from event
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
        }
    },
    mounted() {
        this.initializeBoard();
    }
}
</script>

<style scoped>
.game-board {
    /* Add your component styles here */
}

.grid {
    display: flex;
    flex-direction: column;
    width: calc(40px * 8);
    margin: 0 auto;
    background-color: #f0f0f0;
    gap: 2px;
    border: 1px solid #ccc;
}

.row {
    display: flex;
    justify-content: center; /* Centering the blocks within the row */
    align-items: center; /* Vertically aligning the blocks */
    gap: 2px;
}

.block {
    flex: 1;
    border: 0px solid #ccc;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    background-color: #FFF;
}

.filled-block {
    background-color: #945353;
}

.shape-selection {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 400px;
    margin: auto;
    padding: 30px;
    gap: 10px;
}
</style>
