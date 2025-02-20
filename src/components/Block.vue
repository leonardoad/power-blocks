<template>
  <div class="shape" 
       @mousedown="handleMouseDown" 
       @dragstart="handleDragStart" 
       @dragend="handleDragEnd"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd"
       :style="shapeStyle"
       draggable="true"
       >
      <div class="row" v-for="(row, rowIndex) in shape" :key="rowIndex">
          <div class="block" :class="{'fill': applyStyles(rowIndex, blockIndex), 'dragging': isDragging}" v-for="(block, blockIndex) in row" :key="blockIndex"  :style="applyStyles(rowIndex, blockIndex)">
          </div>
      </div>
  </div>
</template>

<script>
import './Block.css';

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
      blockStyle: {},
      offsetX: 0,
      offsetY: 0,
      touchCurrentX: 0,
      touchCurrentY: 0,
      isDragging: false,
      color: this.getRandomColor(),
    };
  },
  computed: {
    shapeStyle() {
      if (this.isDragging) {
        return {
          position: 'absolute',
          left: `${this.touchCurrentX}px`,
          top: `${this.touchCurrentY}px`,
          zIndex: 1000,
        };
      }
      return {};
    }
  },
  methods: {
    applyStyles(rowIndex, blockIndex) {
      if (!this.shape) return;
      if(this.shape[rowIndex][blockIndex]) {
        return {
          background: `linear-gradient(145deg, ${this.color}, ${this.color} 50%, ${this.color} 50%, ${this.color} 100%)`,
        }
      }
    },
    handleMouseDown() {
      this.$emit('shapeClicked', {name: this.name, color: this.color});
    },
    handleDragStart(event) {
      event.dataTransfer.setData('name', this.name);
      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      event.dataTransfer.setData('offsetX', offsetX);
      event.dataTransfer.setData('offsetY', offsetY);
    },
    handleTouchStart(event) {
      event.preventDefault();
      const rect = event.target.parentElement.getBoundingClientRect();
      this.offsetX = event.touches[0].clientX - rect.left;
      this.offsetY = event.touches[0].clientY - rect.top;

      this.touchCurrentX = event.touches[0].clientX - this.offsetX;
      this.touchCurrentY = event.touches[0].clientY - this.offsetY;

      this.isDragging = true;
      this.$emit('shapeClicked', {name: this.name, color: this.color});
    },
    handleTouchMove(event) {
      const touch = event.touches[0];
      this.touchCurrentX = touch.clientX - this.offsetX;
      this.touchCurrentY = touch.clientY - this.offsetY;
    },
    handleTouchEnd(event ) {
      this.isDragging = false;
      const touch = event.changedTouches[0];
      this.$emit('shapeDropped', { name: this.name, clientX: touch.clientX, clientY: touch.clientY, offsetX: this.offsetX, offsetY: this.offsetY});
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
}
</script>
