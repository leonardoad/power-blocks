<template>
  <div class="shape" 
       @mousedown="handleMouseDown" 
       @dragstart="handleDragStart" 
       @dragend="handleDragEnd"
       draggable="true">
      <div class="row" v-for="(row, rowIndex) in shape" :key="rowIndex">
          <div class="block" v-for="(block, blockIndex) in row" :key="blockIndex"  :style="applyStyles(rowIndex, blockIndex)">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BlockComponent',
  props: {
    name: {
      type: String,
      required: false,
      default: 'Block'
    },
    shape: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      // Add your component data here
      blockStyle: {}
    };
  },
  methods: {
    applyStyles(rowIndex, blockIndex) {
      if(!this.shape) return;
      return {
        backgroundColor: this.shape[rowIndex][blockIndex] ? '#945353' : 'transparent',
        border: this.shape[rowIndex][blockIndex] ? '1px solid #ccc' : '1px solid transparent'
      };
    },
    handleMouseDown(name) {
      this.$emit('shapeClicked', name);
    },
    handleDragStart(event) {
      event.dataTransfer.setData('name', this.name);
      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      event.dataTransfer.setData('offsetX', offsetX);
      event.dataTransfer.setData('offsetY', offsetY);
    },
    handleDragEnd() {
      // Handle any cleanup after drag ends if necessary
    }
  },
}
</script>

<style scoped>
.block {
  width: 35px;
  height: 35px;
  background-color: #945353;
  /* border: 1px solid #ccc; */
}

.row {
    display: flex;
}
</style>
