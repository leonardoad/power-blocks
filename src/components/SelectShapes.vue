<template>
  <div class="select-shapes-overlay" v-if="visible">
    <div class="select-shapes-content">
      <div class="select-shapes-grid">
        <div
          class="select-shapes-cell"
          v-for="(shape, shapeName) in shapes"
          :key="shapeName"
          :class="{ selected: selectedShapes.includes(shapeName) }"
          @click="toggleShapeSelection(shapeName)"
        >
          <Block :shape="shape" :name="shapeName" :disableDragging="true" />
        </div>
      </div>
      <div class="select-shapes-controls">
        <button class="select-shapes-button" @click="saveSelection">Save</button>
        <button class="select-shapes-button" @click="cancelSelection">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Block from './Block.vue';

export default {
  name: 'SelectShapes',
  components: { Block },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    shapes: {
      type: Object,
      required: true
    },
    initialSelectedShapes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedShapes: []
    };
  },
  watch: {
    initialSelectedShapes: {
      immediate: true,
      handler(newVal) {
        this.selectedShapes = [...newVal];
      }
    }
  },
  methods: {
    toggleShapeSelection(shapeName) {
      const index = this.selectedShapes.indexOf(shapeName);
      if (index > -1) {
        this.selectedShapes.splice(index, 1);
      } else {
        this.selectedShapes.push(shapeName);
      }
    },
    saveSelection() {
      this.$emit('save', this.selectedShapes);
    },
    cancelSelection() {
      this.$emit('cancel');
    }
  }
};
</script>

<style>
.select-shapes-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-shapes-content {
  background: linear-gradient(to bottom, #4358ad, #2c3e75);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
}

.select-shapes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.select-shapes-cell {
  background: #333;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.select-shapes-cell.selected {
  background: #ff0;
}

.select-shapes-controls {
  display: flex;
  justify-content: space-between;
}

.select-shapes-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #232b54;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #fff;
  font-weight: bold;
}

.select-shapes-button:hover {
  background-color: #1e264a;
}
</style>