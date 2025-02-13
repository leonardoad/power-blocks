<template>
    <div class="game-board">
        <h2>Game Board</h2>
        <!-- Add your game board elements here -->
        <div class="grid" @dragover.prevent @drop="handleDrop" ref="gameBoard">
            <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                <div class="block" v-for="(block, blockIndex) in row" :key="blockIndex">
                    <Block v-if="block" :shape="[[1]]" :index="blockIndex" @shapeClicked="handleShapeClicked" />
                </div>
            </div>
        </div>
        <div class="shape-selection">
            <div v-for="(shape, index) in currentShapes" :key="index">
                <Block :shape="shapes[shape]" :name="shape" :index="index" @shapeClicked="handleShapeClicked" />
            </div>
        </div>
        <button @click="addShape(shapes[selectedShape], 0, 0)">Add Shape</button>
    </div>
</template>

<script>
import Block from './Block.vue';
export default {
  components: { Block },
    name: 'GameBoard',
    data() {
        return {
            board: [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
            ],
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
            currentShapes: ['square', 'line', 't', 'l', 'j', 's', 'z', 'bSquare', 'rectangle'],
            selectedShape: 'bSquare'
        };
    },
    methods: {
        initializeBoard() {
        },
        resetBoard() {
            this.initializeBoard();
        },
        addShape(shape, row, col) {
            for (let i = 0; i < shape.length; i++) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] === 1) {
                        this.board[row + i][col + j] = 'X';
                    }
                }
            }
        },
        handleShapeClicked(shape) {
            console.log('Shape clicked:', shape);
            // Implement your logic to handle the shape click event
            this.selectedShape = shape;
        },
        handleDrop(event) {
            const name = event.dataTransfer.getData('name');
            const offsetX = parseFloat(event.dataTransfer.getData('offsetX'));
            const offsetY = parseFloat(event.dataTransfer.getData('offsetY'));
            const boardRect = this.$refs.gameBoard.getBoundingClientRect();
            const dropX = event.clientX - boardRect.left - offsetX;
            const dropY = event.clientY - boardRect.top - offsetY;
            const row = Math.floor(dropY / 40); // Using dropY for row calculation
            const col = Math.floor(dropX / 40); // Using dropX for column calculation
            this.addShape(this.shapes[name], row, col);
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
    cursor: pointer;
    background-color: #FFF;
}

.block:hover {
    background-color: #f0f0f0;
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
