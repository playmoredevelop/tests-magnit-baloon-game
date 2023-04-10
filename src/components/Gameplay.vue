<script setup lang="ts">

import { onMounted } from 'vue';
import { BalloonsScene } from '../gameplay/balloon.scene';
import { PRELOADER_PROGRESS, PRELOADER_VISIBLE } from '../datamapper'
import RadialProgressBar from "vue3-radial-progress"
import Gameplay from '../gameplay'

// pixi app
// loader
// resize
// init gameplay ticker
// random setup gameplay
// run gameplay

let game: Gameplay = undefined

onMounted(async () => {

    (typeof game !== 'undefined') && game.destroy()

    game = new Gameplay({
        id: 'gameplay'
    })

    game.run(new BalloonsScene)
    
})

</script>

<template id="test">
    <div id="gameplay"></div>
    <div class="progressbar"><RadialProgressBar v-show="PRELOADER_VISIBLE" :diameter="70" :total-steps="100" :completed-steps="PRELOADER_PROGRESS" :animate-speed="250" :stroke-width="12" /></div>
</template>
