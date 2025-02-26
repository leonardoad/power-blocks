<template>
  <div class="score-board">
    <div class="high-score">High Score: {{ highScore }}</div>
    <div class="score" :class="{ highlight: isHighScoreAnimated }">{{ scoreDisplay }}</div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    highScore: {
      type: Number,
      required: true
    },
    scoreDisplay: {
      type: Number,
      required: true
    },
    isHighScoreAnimated: {
      type: Boolean,
      required: true
    }
  }
};
</script>
 