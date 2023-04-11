<script setup lang="ts">

import { onMounted } from 'vue';
import { BalloonsScene } from '../gameplay/balloon.scene';
import { PRELOADER_PROGRESS, PRELOADER_VISIBLE } from '../settings'
import RadialProgressBar from "vue3-radial-progress"
import Gameplay from '../gameplay'

onMounted(async () => {
    
    const game = new Gameplay();
    game.run(new BalloonsScene)
    
})

</script>

<template id="test">
    <div id="gameplay"></div>
    <div class="progressbar"><RadialProgressBar v-show="PRELOADER_VISIBLE" :diameter="70" :total-steps="100" :completed-steps="PRELOADER_PROGRESS" :animate-speed="250" :stroke-width="12" /></div>
</template>
