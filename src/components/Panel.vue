<script setup lang="ts">
import { SHOW_RESULTS, WINNER_PRIZE, BALLOON_BURST_ALLOWED, BURST_LEFT } from '../settings';
</script>
<template>
    <div v-show="BURST_LEFT > 0" class="panel-left-total animate__animated animate__fadeInDown">{{ BURST_LEFT }} / {{ BALLOON_BURST_ALLOWED }}</div>
    <div v-show="SHOW_RESULTS" class="animate__animated animate__flipInY panel-results">
        <h3>Поздравляем!</h3>
        <p>Вы выиграли:</p>
        <span>{{ WINNER_PRIZE }} баллов</span>
    </div>
</template>