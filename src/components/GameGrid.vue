<template>
  <div class="grid" @dragover.prevent="handleDragOver" @drop="handleDrop" ref="gameBoard">
    <div class="row" v-for="(row, rowIndex) in board" :key="`grid-${rowIndex}`">
      <div class="cell" v-for="(block, blockIndex) in row" :key="`cell-${rowIndex}-${blockIndex}`"
           :class="{ 'filled-cell': block, 'hover-cell': isHoverCell(rowIndex, blockIndex) }"
           :style="applyCellStyle(block)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameGrid',
  props: {
    board: {
      type: Array,
      required: true
    },
    hoverCells: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDragOver(event) {
      this.$emit('dragover', event);
    },
    handleDrop(event) {
      this.$emit('drop', event);
    },
    isHoverCell(row, col) {
      return this.hoverCells.some(cell => cell.row === row && cell.col === col);
    },
    applyCellStyle(block) {
      if (block !== null) {
        return {
          background: `linear-gradient(145deg, ${block}, ${block} 50%, ${block} 50%, ${block} 100%)`,
        };
      }
      return {};
    }
  }
};
</script>
