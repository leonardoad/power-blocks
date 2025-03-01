<template>
  <div class="shape-selection">
    <div v-for="(shape, index) in currentShapes" :key="`${shape.name}-${index}`">
      <Block :shape="shapes[shape.name]" :name="shape.name" :index="index" @shapeClicked="handleShapeClicked"
             @shapeDragged="handleShapeDragged" @shapeDropped="handleShapeDropped" :color="shape.color" :power="shape.power" :id="shape.id" />
    </div>
  </div>
</template>

<script>
import Block from './Block.vue';

export default {
  name: 'ShapeSelection',
  components: { Block },
  props: {
    shapes: {
      type: Object,
      required: true
    },
    currentShapes: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleShapeClicked(event) {
      this.$emit('shapeClicked', event);
    },
    handleShapeDragged(event) {
      this.$emit('shapeDragged', event);
    },
    handleShapeDropped(event) {
      this.$emit('shapeDropped', event);
    }
  }
};
</script>