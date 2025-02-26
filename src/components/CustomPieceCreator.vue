<template>
  <div class="custom-piece-overlay" v-if="visible">
    <div class="custom-piece-overlay-content">
      <h2>Create Your Custom Piece</h2>
      <div class="custom-piece-grid">
        <div class="custom-piece-row" v-for="(row, rowIndex) in piece" :key="rowIndex">
          <div class="custom-piece-cell" v-for="(cell, cellIndex) in row" :key="cellIndex"
               :class="{ 'filled': cell }"
               @click="toggleCell(rowIndex, cellIndex)">
          </div>
        </div>
      </div>
      <div class="custom-piece-controls">
        <button class="custom-piece-button" @click="savePiece" :disabled="blockCount > 6">Save</button>
        <button class="custom-piece-button" @click="cancel">Cancel</button>
      </div>
      <p>Blocks: {{ blockCount }} / 6</p>
    </div>
  </div>
</template>

<script>
import './CustomPieceCreator.css';
export default {
  name: 'CustomPieceCreator',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      piece: Array.from({ length: 4 }, () => Array(4).fill(0))
    };
  },
  computed: {
    blockCount() {
      return this.piece.flat().filter(cell => cell === 1).length;
    }
  },
  methods: {
    toggleCell(row, col) {
      if (this.piece[row][col] === 1) {
        this.piece[row][col] = 0;
      } else if (this.blockCount < 6) {
        this.piece[row][col] = 1;
      }
    },
    savePiece() {
      this.$emit('save', this.piece);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>