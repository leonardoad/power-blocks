<template>
  <div class="shape" @mousedown="handleClick(name)">
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
    handleClick(name) {
      this.$emit('shapeClicked', name);
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
